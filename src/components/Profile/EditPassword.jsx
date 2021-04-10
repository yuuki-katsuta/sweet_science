import { useContext, useState } from 'react';
import { AuthContext } from '../../auth/AuthProvider.js';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import TextInputField from '../InputField/TextInputField';

const InputFieldWrapper = {
  textAlign: 'center',
};

const PasswordInputField = {
  margin: '8px 0',
  maxWidth: '552px',
};

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
      <Button
        style={{ margin: '16px auto 42px' }}
        variant='outlined'
        onClick={() => {
          setOpen(true);
        }}
      >
        Change Password
      </Button>
      <Modal
        className={modal}
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={paper}>
            <h3>Please enter a new Password</h3>
            <div style={InputFieldWrapper}>
              <TextInputField
                style={PasswordInputField}
                type={'password'}
                value={currentPassword}
                setState={setCurrentPassword}
                label={'Current Password'}
                placeholder={'Current Password'}
                fullWidth
              />
            </div>
            <div style={InputFieldWrapper}>
              <TextInputField
                style={PasswordInputField}
                type={'password'}
                value={newPassword}
                setState={setNewPassword}
                label={'New Password'}
                placeholder={'New Password'}
                fullWidth
              />
            </div>
            <div style={InputFieldWrapper}>
              <TextInputField
                style={PasswordInputField}
                type={'password'}
                value={confirmPassword}
                setState={setConfirmPassword}
                label={'Confirim Password'}
                placeholder={'Confirim Password'}
                fullWidth
              />
            </div>
            <div style={{ textAlign: 'right', marginTop: '16px' }}>
              <Button
                onClick={() => {
                  resetState();
                }}
              >
                Cancel
              </Button>
              <Button
                color='primary'
                onClick={async () => {
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
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
};
export default Password;
