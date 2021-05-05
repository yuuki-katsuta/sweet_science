import { useContext, useState, memo } from 'react';
import { db } from '../../base';
import { useHistory } from 'react-router-dom';
import { RootContext } from '../../Provider';
import BaseIconButton from '../Button/BaseIconButton';
import TextInputField from '../InputField/TextInputField';
import Grid from '@material-ui/core/Grid';
import SendIcon from '@material-ui/icons/Send';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import styled from 'styled-components';

const SContainer = styled.div`
  width: 70%;
  margin: 0 auto;
`;
const SGrid = styled(Grid)`
  position: relative;
`;
const SBackButtonWrapper = styled.span`
  position: absolute;
  bottom: -10px;
  right: 10px;
`;
const SSendButtonWrapper = styled.span`
  position: absolute;
  bottom: 0;
  left: 8px;
`;

const MessageAddField = memo(({ title, refer }) => {
  const { currentUser } = useContext(RootContext);
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
    <SContainer>
      <Grid container>
        <SGrid item xs={1}>
          <SBackButtonWrapper>
            <BaseIconButton
              onClickHandler={() => {
                history.goBack();
              }}
            >
              <KeyboardReturnIcon fontSize='large' />
            </BaseIconButton>
          </SBackButtonWrapper>
        </SGrid>
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
        <SGrid item xs={1}>
          <SSendButtonWrapper>
            <BaseIconButton
              disabled={text === ''}
              onClickHandler={() => {
                messageAdd();
              }}
            >
              <SendIcon />
            </BaseIconButton>
          </SSendButtonWrapper>
        </SGrid>
      </Grid>
    </SContainer>
  );
});
export default MessageAddField;
