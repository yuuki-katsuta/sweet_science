import React, { useEffect, useState, useContext, memo, useRef } from 'react';
import { AuthContext } from '../../auth/AuthProvider';
import { db } from '../../base';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded';

const LikedCount = memo(({ title, id }) => {
  const [count, setCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const processing = useRef(false);

  const docRef = db
    .collection('chats')
    .doc(`${title}`)
    .collection('messages')
    .doc(`${id}`);

  useEffect(() => {
    let isMounted = true;

    const GetNumberOfLikes = () => {
      docRef.onSnapshot((doc) => {
        isMounted && setCount(doc.data().liked);
      });
      docRef
        .collection('likedUser')
        .doc(`${currentUser.uid}`)
        .get()
        .then((doc) => {
          //いいね済み
          if (doc.exists && doc.data().user === currentUser.uid) {
            isMounted && setIsLiked(true);
          }
        });
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
    //処理中
    processing.current = true;
    docRef
      .collection('likedUser')
      .doc(`${currentUser.uid}`)
      .get()
      .then(async (doc) => {
        //いいね済み
        if (doc.exists && doc.data().user === currentUser.uid) {
          setIsLiked(false);
          await docRef.update({
            liked: count - 1,
          });
          //いいねユーザーを削除
          await docRef
            .collection('likedUser')
            .doc(`${currentUser.uid}`)
            .delete();
          //処理完了
          processing.current = false;
          return;
        }
        //いいねユーザーを登録
        docRef
          .collection('likedUser')
          .doc(`${currentUser.uid}`)
          .set({
            user: currentUser.uid,
            createdAt: new Date(),
          })
          .then(async () => {
            await docRef.update({
              liked: count + 1,
            });
            setIsLiked(true);
            //処理完了
            processing.current = false;
          });
      })
      .catch((error) => {
        alert(error.message);
      });
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
        label={count === 0 ? null : count}
      />
    </span>
  );
});

export default LikedCount;
