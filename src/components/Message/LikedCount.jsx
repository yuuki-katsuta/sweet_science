import { useEffect, useState, memo, useRef } from 'react';
import { db } from '../../base';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded';
import styled from 'styled-components';

const SCount = styled.span`
  color: '#666666';
`;

const LikedCount = memo(({ title, id, currentUser }) => {
  const [count, setCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const processing = useRef(false);

  const docRef = db
    .collection('chats')
    .doc(`${title}`)
    .collection('messages')
    .doc(`${id}`);

  useEffect(() => {
    let isMounted = true;
    const GetNumberOfLikes = async () => {
      docRef.onSnapshot((doc) => {
        isMounted && setCount(doc.data().liked);
      });
      const likedUser = await docRef
        .collection('likedUser')
        .doc(`${currentUser.uid}`)
        .get();
      //いいね済み
      if (likedUser.exists && likedUser.data().user === currentUser.uid) {
        isMounted && setIsLiked(true);
      }
    };
    GetNumberOfLikes();
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line
  }, []);

  const handleClick = async () => {
    //更新中なら処理しない
    if (processing.current) return;
    processing.current = true;
    try {
      const likedUser = await docRef
        .collection('likedUser')
        .doc(`${currentUser.uid}`)
        .get();
      //いいね済み
      if (likedUser.exists && likedUser.data().user === currentUser.uid) {
        setIsLiked(false);
        await docRef.update({ liked: count - 1 });
        //いいねユーザーを削除
        await docRef.collection('likedUser').doc(`${currentUser.uid}`).delete();
        //処理完了
        processing.current = false;
        return;
      }
      //いいねユーザーを登録
      await docRef.collection('likedUser').doc(`${currentUser.uid}`).set({
        user: currentUser.uid,
        createdAt: new Date(),
      });
      await docRef.update({ liked: count + 1 });
      setIsLiked(true);
      processing.current = false;
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
        label={count === 0 ? null : <SCount>{count}</SCount>}
      />
    </span>
  );
});

export default LikedCount;
