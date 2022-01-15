import { useState, memo } from 'react';
import { db } from '../../../../base';
import { useRecoilValue } from 'recoil';
import { currentUserState } from '../../../../store/authState';
import { useAlert } from 'react-alert';
import BaseIconButton from '../../atoms/Button/BaseIconButton';
import TextInputField from '../../atoms/InputField/TextInputField';
import Grid from '@material-ui/core/Grid';
import SendIcon from '@material-ui/icons/Send';
import styled from 'styled-components';
import { useSWRConfig } from 'swr';

const SContainer = styled.div`
  width: 75%;
  margin: 0 auto 16px;
`;
const SGrid = styled(Grid)`
  position: relative;
`;
const SSendButtonWrapper = styled.span`
  position: absolute;
  bottom: 0;
  left: 8px;
`;

const MessageAddField = memo(({ room }) => {
  const { mutate } = useSWRConfig();
  const currentUser = useRecoilValue(currentUserState);
  const Alert = useAlert();
  const [text, setText] = useState('');

  const messageAdd = async () => {
    if (text.trim() === '') {
      alert('Please enter a message');
      return;
    }
    await db.collection('chats').doc(room).collection('messages').add({
      user: currentUser.displayName,
      message: text,
      uid: currentUser.uid,
      createdAt: new Date(),
      photoURL: currentUser.photoURL,
      liked: 0,
    });
    mutate(`firestore/chat/${room}/message`);
    setText('');
    Alert.success('コメントを追加しました!!');
  };

  return (
    <SContainer>
      <Grid container>
        <Grid item xs={11}>
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
