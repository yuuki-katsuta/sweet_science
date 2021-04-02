import { useState } from 'react';
import { db } from '../../base';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

const MessageAddField = ({ history, currentUser, title, refer }) => {
  const [text, setText] = useState('');

  const messageAdd = () => {
    if (text === '') return;
    db.collection('chats')
      .doc(`${title}`)
      .collection('messages')
      .add({
        user: currentUser.displayName,
        message: text,
        uid: currentUser.uid,
        createdAt: new Date(),
        photoURL: currentUser.photoURL,
        liked: 0,
      })
      .then(() => {
        setText('');
        //自動スクロール
        refer.current.scrollIntoView({ behavior: 'smooth' });
      });
    // eslint-disable-next-line
  };

  return (
    <div style={{ width: '70%', margin: '0 auto' }}>
      <Grid container>
        <Grid item xs={1} style={{ position: 'relative' }}>
          <IconButton
            style={{
              position: 'absolute',
              bottom: '-10px',
              right: '10px',
            }}
            onClick={() => {
              history.push('/');
            }}
          >
            <KeyboardReturnIcon fontSize='large' />
          </IconButton>
        </Grid>
        <Grid item xs={10}>
          <TextField
            fullWidth={true}
            id='standard-multiline-static'
            label='メッセージを送る'
            multiline
            rows={3}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={1} style={{ position: 'relative' }}>
          <IconButton
            style={{ position: 'absolute', bottom: '0', left: '8px' }}
            disabled={text === ''}
            onClick={() => {
              messageAdd();
            }}
          >
            <SendIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};
export default MessageAddField;
