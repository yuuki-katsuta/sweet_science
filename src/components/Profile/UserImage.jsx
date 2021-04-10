import { useContext, useState } from 'react';
import { storage } from '../../base';
import { AuthContext } from '../../auth/AuthProvider';
import firebase from 'firebase/app';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import BaseIconButton from '../Button/BaseIconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SendIcon from '@material-ui/icons/Send';

const avatarWrapper = {
  position: 'relative',
};
const imageStyle = {
  margin: '0 auto',
  border: '1px solid #555555',
  width: '144px',
  height: '144px',
};
const buttonStyle = {
  position: 'absolute',
  left: '52px',
  top: '100px',
};
const labelStyle = { fontWeight: 'bold', cursor: 'pointer' };

const UserImage = () => {
  const { currentUser, ChangePhtoUrl, ResetPhtoUrl, guestUser } = useContext(
    AuthContext
  );
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState(currentUser.photoURL);
  const [filename, setFileName] = useState('');

  const handleImage = (event) => {
    const image = event.target.files[0];
    setFileName(image.name);
    setImage(image);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (image === '' || image === undefined) {
      alert('ファイルが選択されていません');
      return;
    }
    // アップロード処理
    const uploadTask = storage
      .ref(`/images/${currentUser.uid}/${image.name}`)
      .put(image);
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      next,
      error,
      complete
    );
  };
  const next = (snapshot) => {};
  const error = (error) => {
    alert(error.message);
  };
  const complete = () => {
    // 完了後の処理
    // 画像表示のため、アップロードした画像のURLを取得
    storage
      .ref(`images/${currentUser.uid}`)
      .child(image.name)
      .getDownloadURL()
      .then(async (fireBaseUrl) => {
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
          <span style={avatarWrapper}>
            <Avatar alt='uploaded' src={imageUrl} style={imageStyle} />
            {imageUrl !== '' && (
              <BaseIconButton
                style={buttonStyle}
                oncClickHandler={() => {
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
              </BaseIconButton>
            )}
          </span>
        ) : (
          <Avatar alt='uploaded' style={imageStyle} />
        )}
      </div>
      {!guestUser && (
        <div>
          <label style={labelStyle}>
            ファイルを選択
            <input
              onChange={handleImage}
              type='file'
              style={{ display: 'none' }}
            />
          </label>
          {filename.length > 15 ? (
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
