import { useContext, useState } from 'react';
import { AuthContext } from '../../auth/AuthProvider.js';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import BaseButton from '../Button/BaseButton';
import TextInputField from '../InputField/TextInputField';

const InputFieldWrapper = { textAlign: 'center' };
const PasswordInputField = { margin: '8px 0', maxWidth: '552px' };
const buttonStyle = { margin: '16px auto 42px' };
const buttonWrapper = { textAlign: 'right', marginTop: '16px' };

const Password = ({ modal, paper }) => {
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
      <Modal
        style={modal}
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div style={paper}>
            <h3>Please enter a new Password</h3>
            <div style={InputFieldWrapper}>
              <TextInputField
                type='password'
                label='Current Password'
                placeholder='Current Password'
                setState={setCurrentPassword}
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
                setState={setNewPassword}
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
                setState={setConfirmPassword}
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
          </div>
        </Fade>
      </Modal>
    </>
  );
};
export default Password;
