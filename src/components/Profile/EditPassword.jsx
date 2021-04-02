import { useContext, useState } from 'react';
import { AuthContext } from '../../auth/AuthProvider.js';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import TextInputField from '../TextInputField';

const Password = ({ modal, paper }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [open, setOpen] = useState(false);
  const { ChangeCurrentPassword } = useContext(AuthContext);

  const handleClose = () => {
    setOpen(false);
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
            <TextInputField
              type={'password'}
              value={currentPassword}
              setName={setCurrentPassword}
              label={'Current Password'}
              placeholder={'Current Password'}
            />
            <TextInputField
              type={'password'}
              value={newPassword}
              setName={setNewPassword}
              label={'New Password'}
              placeholder={'New Password'}
            />
            <TextInputField
              type={'password'}
              value={confirmPassword}
              setName={setConfirmPassword}
              label={'Confirim Password'}
              placeholder={'Confirim Password'}
            />
            <IconButton
              style={{
                display: 'flex',
                margin: '0 0 0 auto',
              }}
              onClick={async () => {
                if (newPassword === '' || confirmPassword === '') {
                  handleClose();
                  return;
                }
                await ChangeCurrentPassword(
                  currentPassword,
                  confirmPassword,
                  newPassword
                );
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
                handleClose();
              }}
            >
              <CreateIcon />
            </IconButton>
          </div>
        </Fade>
      </Modal>
    </>
  );
};
export default Password;
