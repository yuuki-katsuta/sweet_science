import React, { useContext, useState } from 'react';
import { storage } from '../../base';
import { AuthContext } from '../../auth/AuthProvider';
import firebase from 'firebase/app';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  image: {
    margin: '0 auto',
    border: '1px solid #555555',
    width: theme.spacing(18),
    height: theme.spacing(18),
  },
}));

const UserImage = () => {
  const { currentUser, ChangePhtoUrl, ResetPhtoUrl, guestUser } = useContext(
    AuthContext
  );
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState(currentUser.photoURL);
  const [filename, setFileName] = useState('');
  const classes = useStyles();

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
    const uploadTask = storage.ref(`/images/${image.name}`).put(image);
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
      .ref('images')
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
    <div className='App'>
      <div className={classes.root}>
        {currentUser.photoURL ? (
          <span
            style={{
              position: 'relative',
            }}
          >
            <Avatar alt='uploaded' src={imageUrl} className={classes.image} />
            {imageUrl !== '' && (
              <Tooltip title='Remove photo' arrow placement='right-start'>
                <IconButton
                  aria-label='delete'
                  style={{
                    position: 'absolute',
                    left: '52px',
                    bottom: '25px',
                  }}
                  onClick={() => {
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
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )}
          </span>
        ) : (
          <Avatar alt='uploaded' className={classes.image} />
        )}
      </div>
      {!guestUser && (
        <div>
          <label style={{ fontWeight: 'bold', cursor: 'pointer' }}>
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
          <IconButton
            onClick={(e) => {
              onSubmit(e);
            }}
          >
            <SendIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
};
export default UserImage;
