import { useState } from 'react';
import { db } from '../../../base';
import { useRecoilValue } from 'recoil';
import { currentUserState } from '../../../store/authState';
import BaseIconButton from '../../ui/atoms/Button/BaseIconButton';
import TextInputField from '../../ui/atoms/InputField/TextInputField';
import Grid from '@material-ui/core/Grid';
import SendIcon from '@material-ui/icons/Send';
import styled from 'styled-components';

const AddForm = ({ refer }) => {
  const currentUser = useRecoilValue(currentUserState);
  const [text, setText] = useState('');
  const messageAdd = async () => {
    if (text.trim() === '') {
      alert('Please enter a message');
      return;
    }
    await db.collection('free-chat').add({
      user: currentUser.displayName,
      message: text,
      uid: currentUser.uid,
      createdAt: new Date(),
      photoURL: currentUser.photoURL,
    });
    setText('');
    refer.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <SWrapper>
      <SContainer>
        <Grid container>
          <Grid item xs={11}>
            <TextInputField
              fullWidth
              id='standard-multiline-static'
              label='メッセージを送る'
              multiline
              rows={2}
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
    </SWrapper>
  );
};
export default AddForm;

const SWrapper = styled.div``;
const SContainer = styled.div`
  margin: 32px auto;
  width: 75%;
`;
const SGrid = styled(Grid)`
  position: relative;
`;
const SSendButtonWrapper = styled.span`
  position: absolute;
  bottom: 0;
  left: 8px;
`;
