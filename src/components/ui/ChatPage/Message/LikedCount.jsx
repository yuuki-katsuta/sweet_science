import { useEffect, useState, memo, useRef } from 'react';
import { db } from '../../../../base';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded';
import styled from 'styled-components';

const SCount = styled.span`
  color: '#666666';
`;

const LikedCount = memo(({ room, id, userUid }) => {
  const [count, setCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const processing = useRef(false);
  useEffect(() => {
    let isMounted = true;
    const docRef = db
      .collection('chats')
      .doc(room)
      .collection('messages')
      .doc(`${id}`);
    (async () => {
      docRef.onSnapshot((doc) => {
        isMounted && setCount(doc.data().liked);
      });
      const likedUser = await docRef
        .collection('likedUser')
        .doc(`${userUid}`)
        .get();
      //いいね済み
      if (likedUser.exists && likedUser.data().user === userUid && isMounted)
        setIsLiked(true);
    })();
    return () => {
      isMounted = false;
    };
  }, [id, room, userUid]);

  const handleClick = async () => {
    //更新中なら処理しない
    if (processing.current) return;
    processing.current = true;
    try {
      const docRef = db
        .collection('chats')
        .doc(room)
        .collection('messages')
        .doc(`${id}`);
      const likedUser = await docRef
        .collection('likedUser')
        .doc(`${userUid}`)
        .get();
      //いいね済み
      if (likedUser.exists && likedUser.data().user === userUid) {
        setIsLiked(false);
        return await db
          .runTransaction(async (transaction) => {
            const latestgetData = await transaction.get(docRef);
            const latestData = latestgetData.data().liked;
            const newCount = latestData - 1;
            transaction.update(docRef, { liked: newCount });
          })
          .then(async () => {
            processing.current = false;
            //いいねユーザーを削除
            await docRef.collection('likedUser').doc(`${userUid}`).delete();
          });
      }
      //いいねユーザーを登録
      await docRef.collection('likedUser').doc(`${userUid}`).set({
        user: userUid,
        createdAt: new Date(),
      });
      return await db
        .runTransaction(async (transaction) => {
          const latestgetData = await transaction.get(docRef);
          const latestData = latestgetData.data().liked;
          const newCount = latestData + 1;
          transaction.update(docRef, { liked: newCount });
        })
        .then(() => {
          processing.current = false;
          setIsLiked(true);
        });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <span>
      <FormControlLabel
        control={
          <Checkbox
            onClick={() => {
              handleClick();
            }}
            icon={<ThumbUpAltOutlinedIcon className={'likeIcon'} />}
            checkedIcon={<ThumbUpAltRoundedIcon className={'likeIcon'} />}
            name='checked'
            color='default'
            checked={isLiked}
          />
        }
        label={count !== 0 && <SCount>{count}</SCount>}
      />
    </span>
  );
});

export default LikedCount;
