import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Reauthentication } from '../../../controllers/AuthController';
import { currentUserState } from '../../../store/authState';
import BaseButton from '../atoms/Button/BaseButton';
import TextInputField from '../atoms/InputField/TextInputField';
import BaseModal from './BaseModal.jsx';
import styled from 'styled-components';

const SInputFieldWrapper = styled.div`
  text-align: 'center';
`;
const SPasswordInputField = styled(TextInputField)`
  margin: 8px 0;
`;
const SChangePasswordButton = styled(BaseButton)`
  margin: 16px auto 42px;
`;
const SButtonWrapper = styled.div`
  text-align: right;
  margin-top: 16px;
`;

const Password = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [open, setOpen] = useState(false);
  const currentUser = useRecoilValue(currentUserState);
  const handleClose = () => {
    setOpen(false);
  };
  const resetState = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    handleClose();
  };

  const ChangeCurrentPassword = async (
    currentPassword,
    newPassword,
    confirmPassword
  ) => {
    try {
      if (newPassword !== confirmPassword)
        throw new Error('Passwords do not match');
      await Reauthentication(currentPassword);
      await currentUser.updatePassword(newPassword);
      alert('Updated the password');
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <SChangePasswordButton
        variant='outlined'
        setState={() => {
          setOpen(true);
        }}
      >
        Change Password
      </SChangePasswordButton>
      <BaseModal open={open}>
        <h3>Please enter a new Password</h3>
        <form>
          <SInputFieldWrapper>
            <SPasswordInputField
              autoComplete='true'
              type='password'
              label='Current Password'
              placeholder='Current Password'
              setState={(e) => {
                setCurrentPassword(e.target.value);
              }}
              value={currentPassword}
              fullWidth
            />
            <SPasswordInputField
              autoComplete='true'
              type='password'
              label='New Password'
              placeholder='New Password'
              setState={(e) => {
                setNewPassword(e.target.value);
              }}
              value={newPassword}
              fullWidth
            />
            <SPasswordInputField
              autoComplete='true'
              type='password'
              label='Confirim Password'
              placeholder='Confirim Password'
              setState={(e) => {
                setConfirmPassword(e.target.value);
              }}
              value={confirmPassword}
              fullWidth
            />
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
                if (newPassword === '' || confirmPassword === '') {
                  alert('Please enter in the input field');
                  resetState();
                  return;
                }
                await ChangeCurrentPassword(
                  currentPassword,
                  confirmPassword,
                  newPassword
                );
                resetState();
              }}
            >
              Save
            </BaseButton>
          </SButtonWrapper>
        </form>
      </BaseModal>
    </>
  );
};
export default Password;
