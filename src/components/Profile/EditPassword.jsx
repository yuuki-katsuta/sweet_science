import { useContext, useState } from 'react';
import { AuthContext } from '../../auth/AuthProvider.js';
import BaseButton from '../Button/BaseButton';
import TextInputField from '../InputField/TextInputField';
import BaseModal from './BaseModal.jsx';

const InputFieldWrapper = { textAlign: 'center' };
const PasswordInputField = { margin: '8px 0', maxWidth: '552px' };
const buttonStyle = { margin: '16px auto 42px' };
const buttonWrapper = { textAlign: 'right', marginTop: '16px' };

const Password = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [open, setOpen] = useState(false);
  const { ChangeCurrentPassword } = useContext(AuthContext);

  const handleClose = () => {
    setOpen(false);
  };
  const resetState = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    handleClose();
  };
  return (
    <>
      <BaseButton
        style={buttonStyle}
        variant='outlined'
        setState={() => {
          setOpen(true);
        }}
      >
        Change Password
      </BaseButton>
      <BaseModal open={open}>
        <h3>Please enter a new Password</h3>
        <div style={InputFieldWrapper}>
          <TextInputField
            type='password'
            label='Current Password'
            placeholder='Current Password'
            setState={(e) => {
              setCurrentPassword(e.target.value);
            }}
            value={currentPassword}
            style={PasswordInputField}
            fullWidth
          />
        </div>
        <div style={InputFieldWrapper}>
          <TextInputField
            type='password'
            label='New Password'
            placeholder='New Password'
            setState={(e) => {
              setNewPassword(e.target.value);
            }}
            value={newPassword}
            style={PasswordInputField}
            fullWidth
          />
        </div>
        <div style={InputFieldWrapper}>
          <TextInputField
            type='password'
            label='Confirim Password'
            placeholder='Confirim Password'
            setState={(e) => {
              setConfirmPassword(e.target.value);
            }}
            value={confirmPassword}
            style={PasswordInputField}
            fullWidth
          />
        </div>
        <div style={buttonWrapper}>
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
        </div>
      </BaseModal>
    </>
  );
};
export default Password;
