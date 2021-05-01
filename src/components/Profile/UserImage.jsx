import { useContext, useState, useRef } from 'react';
import { storage } from '../../base';
import { AuthContext } from '../../auth/AuthProvider';
import firebase from 'firebase/app';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import BaseIconButton from '../Button/BaseIconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SendIcon from '@material-ui/icons/Send';
import styled from 'styled-components';
import { db } from '../../base';

const SAvatarWrapper = styled.span`
  position: relative;
`;
const SAvatar = styled(Avatar)`
  margin: 0 auto;
  border: 1px solid #555555;
  width: 144px;
  height: 144px;
`;
const SResetButton = styled(BaseIconButton)`
  position: absolute;
  left: 52px;
  top: 100px;
`;
const SLabel = styled.label`
  font-weight: bold;
  cursor: pointer;
`;
const SInput = styled.input`
  display: none;
`;

const UserImage = () => {
  const { currentUser, ChangePhtoUrl, ResetPhtoUrl, guestUser } = useContext(
    AuthContext
  );
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState(currentUser.photoURL);
  const [filename, setFileName] = useState('');
  const isDataExist = useRef(false);

  const imageCollection = db
    .collection('images')
    .doc(currentUser.uid)
    .collection('image');

  const storageRef = storage.ref(`/images/${currentUser.uid}/${filename}`);

  const handleImage = (event) => {
    const image = event.target.files[0];
    image && setFileName(image.name);
    setImage(image);
  };

  const onSubmit = async (event) => {
    try {
      if (image === '' || image === undefined)
        throw new Error('Passwords do not match');
      await imageCollection
        .where('image', '==', `${filename}`)
        .get()
        .then(async (snapShot) => {
          const data = snapShot.docs[0];
          isDataExist.current = data?.exists;
        });
      //同名のファイルが存在しない場合
      if (!isDataExist.current) {
        // アップロード処理
        const uploadTask = storageRef.put(image);
        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          next,
          error,
          complete
        );
        await imageCollection.add({
          image: `${filename}`,
          createdAt: new Date(),
        });
        return;
      }
      complete();
    } catch (error) {
      alert(error.message);
    }
  };
  const next = (snapshot) => {};
  const error = (error) => {
    alert(error.message);
  };
  const complete = async () => {
    // 完了後の処理
    // 画像表示のため、アップロードした画像のURLを取得
    await storageRef.getDownloadURL().then(async (fireBaseUrl) => {
      await ChangePhtoUrl(fireBaseUrl);
      setImageUrl(currentUser.photoURL);
    });
    setImage('');
    setFileName('');
  };

  return (
    <>
      <div>
        {currentUser.photoURL ? (
          <SAvatarWrapper>
            <SAvatar alt='uploaded' src={imageUrl} />
            {imageUrl !== '' && (
              <SResetButton
                onClickHandler={() => {
                  const result = window.confirm(
                    'Are you sure you want to reset your current avatar?'
                  );
                  if (result) {
                    ResetPhtoUrl();
                    setImageUrl('');
                  } else {
                    return;
                  }
                }}
              >
                <Tooltip title='Remove photo' arrow placement='right-start'>
                  <DeleteIcon />
                </Tooltip>
              </SResetButton>
            )}
          </SAvatarWrapper>
        ) : (
          <SAvatar alt='uploaded' />
        )}
      </div>
      {!guestUser && (
        <div>
          <SLabel>
            ファイルを選択
            <SInput onChange={handleImage} type='file' />
          </SLabel>
          {filename && filename.length > 15 ? (
            <span>{` (${filename.substr(0, 15) + '...'}) `}</span>
          ) : (
            <span>{filename}</span>
          )}
          <BaseIconButton
            onClickHandler={(e) => {
              onSubmit(e);
            }}
          >
            <SendIcon />
          </BaseIconButton>
        </div>
      )}
    </>
  );
};
export default UserImage;
