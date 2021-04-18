import { useState } from 'react';
import { db } from '../../base';
import { useHistory } from 'react-router-dom';
import BaseIconButton from '../Button/BaseIconButton';
import TextInputField from '../InputField/TextInputField';
import Grid from '@material-ui/core/Grid';
import SendIcon from '@material-ui/icons/Send';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

const containerStyle = {
  width: '70%',
  margin: '0 auto',
};
const backButtonStyle = {
  position: 'absolute',
  bottom: '-10px',
  right: '10px',
};
const gridStyle = {
  position: 'relative',
};
const sendButtonStyle = {
  position: 'absolute',
  bottom: '0',
  left: '8px',
};

const MessageAddField = ({ currentUser, title, refer }) => {
  const history = useHistory();
  const [text, setText] = useState('');

  const messageAdd = async () => {
    if (text.trim() === '') {
      alert('Please enter a message');
      return;
    }
    await db.collection('chats').doc(`${title}`).collection('messages').add({
      user: currentUser.displayName,
      message: text,
      uid: currentUser.uid,
      createdAt: new Date(),
      photoURL: currentUser.photoURL,
      liked: 0,
    });
    setText('');
    //自動スクロール
    refer.current.scrollIntoView({ behavior: 'smooth' });

    // eslint-disable-next-line
  };

  return (
    <div style={containerStyle}>
      <Grid container>
        <Grid item xs={1} style={gridStyle}>
          <BaseIconButton
            style={backButtonStyle}
            onClickHandler={() => {
              history.goBack();
            }}
          >
            <KeyboardReturnIcon fontSize='large' />
          </BaseIconButton>
        </Grid>
        <Grid item xs={10}>
          <TextInputField
            fullWidth
            id='standard-multiline-static'
            label='メッセージを送る'
            multiline
            rows={3}
            value={text}
            setState={(e) => {
              setText(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={1} style={gridStyle}>
          <BaseIconButton
            style={sendButtonStyle}
            disabled={text === ''}
            onClickHandler={() => {
              messageAdd();
            }}
          >
            <SendIcon />
          </BaseIconButton>
        </Grid>
      </Grid>
    </div>
  );
};
export default MessageAddField;
