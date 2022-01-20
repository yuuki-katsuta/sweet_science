import { useEffect, useState, memo, useRef, useMemo } from 'react';
import { db } from '../../../../base';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded';
import styled from 'styled-components';

const SCount = styled.span`
  color: '#666666';
`;

const LikedCount = memo(({ room, id, userUid, liked }) => {
  const [isLiked, setIsLiked] = useState(false);
  const processing = useRef(false);

  const docRef = useMemo(
    () => db.collection('chats').doc(room).collection('messages').doc(`${id}`),
    [room, id]
  );

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const likedUser = await docRef
        .collection('likedUser')
        .doc(`${userUid}`)
        .get();
      isMounted &&
        setIsLiked(likedUser.exists && likedUser.data().user === userUid);
    })();
    return () => (isMounted = false);
  }, [id, room, userUid, docRef]);

  const removeUserLikes = async () => {
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
  };

  const registerUserLikes = async () => {
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
  };

  const handleClick = async () => {
    //更新中なら処理しない
    if (processing.current) return;
    processing.current = true;
    const likedUser = await docRef
      .collection('likedUser')
      .doc(`${userUid}`)
      .get();
    if (likedUser.exists && likedUser.data().user === userUid)
      removeUserLikes();
    else registerUserLikes();
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
        label={liked !== 0 && <SCount>{liked}</SCount>}
      />
    </span>
  );
});

export default LikedCount;
