import { useState } from 'react';
import { Reauthentication } from '../../../controllers/AuthController';
import { useRecoilValue } from 'recoil';
import { currentUserState } from '../../../store/authState';
import CreateIcon from '@material-ui/icons/Create';
import BaseIconButton from '../atoms/Button/BaseIconButton';
import BaseButton from '../atoms/Button/BaseButton';
import TextInputField from '../atoms/InputField/TextInputField';
import BaseModal from './BaseModal.jsx';
import styled from 'styled-components';

const SInputFieldWrapper = styled.div`
  text-align: left;
`;
const SIconButton = styled(BaseIconButton)`
  margin: 0 0 3px auto;
`;
const SButtonWrapper = styled.div`
  text-align: right;
  margin-top: 16px;
`;
const STextInputField = styled(TextInputField)`
  text-align: left;
  margin-bottom: 16px;
`;

const EditEmail = () => {
  const [email, setEmail] = useState('');
  const [isEmailChanged, setIsEmailChanged] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [open, setOpen] = useState(false);
  const currentUser = useRecoilValue(currentUserState);

  const handleClose = () => {
    setOpen(false);
    setIsEmailChanged(false);
  };
  const handleOpen = () => {
    setOpen(true);
    setIsEmailChanged(true);
  };
  const resetState = () => {
    handleClose();
    setEmail('');
    setCurrentPassword('');
  };

  const changeCurrentEmail = async (currentPassword, newEmail) => {
    try {
      await Reauthentication(currentPassword);
      await currentUser.updateEmail(newEmail);
      alert('Updated the email');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <h3>
        Email:&nbsp;&nbsp;
        {!email || isEmailChanged
          ? currentUser.email.length > 20
            ? currentUser.email.substr(0, 20) + '...'
            : currentUser.email
          : email.length > 20
          ? email.substr(0, 20) + '...'
          : email}
      </h3>
      <SIconButton
        onClickHandler={() => {
          handleOpen();
        }}
      >
        <CreateIcon />
      </SIconButton>
      <BaseModal open={open}>
        <SInputFieldWrapper>
          <h3>Please enter a new Email</h3>
          <form>
            <STextInputField
              fullWidth
              autoComplete='true'
              type='password'
              label='Current Password'
              placeholder='Current Password'
              value={currentPassword}
              setState={(e) => {
                setCurrentPassword(e.target.value);
              }}
            />
            <TextInputField
              fullWidth
              id='standard-name-required'
              name='email'
              type='email'
              placeholder='new Email'
              value={email}
              setState={(e) => {
                setEmail(e.target.value);
              }}
            />
          </form>
        </SInputFieldWrapper>
        <SButtonWrapper>
          <BaseButton
            setState={() => {
              resetState();
            }}
          >
            Cancel
          </BaseButton>
          <BaseButton
            color='primary'
            setState={async () => {
              await changeCurrentEmail(currentPassword, email);
              resetState();
            }}
          >
            Save
          </BaseButton>
        </SButtonWrapper>
      </BaseModal>
    </>
  );
};
export default EditEmail;
