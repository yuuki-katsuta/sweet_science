import { useContext, useState } from 'react';
import { AuthContext } from '../../auth/AuthProvider.js';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const EditEmail = ({ modal, paper }) => {
  const [email, setEmail] = useState('');
  const [isEmailChanged, setIsEmailChanged] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [open, setOpen] = useState(false);
  const { currentUser, changeCurrentEmail } = useContext(AuthContext);

  const handleClose = () => {
    setOpen(false);
    setIsEmailChanged(false);
  };
  const handleOpen = () => {
    setOpen(true);
    setIsEmailChanged(true);
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
      <IconButton
        style={{ margin: '0 0 3px auto' }}
        onClick={() => {
          handleOpen();
        }}
      >
        <CreateIcon />
      </IconButton>
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
            <div style={{ textAlign: 'center' }}>
              <div style={{ textAlign: 'left' }}>
                <h3>Please enter a new Email</h3>
                <TextField
                  fullWidth
                  type={'password'}
                  value={currentPassword}
                  label={'Current Password'}
                  placeholder={'Current Password'}
                  onChange={(e) => {
                    setCurrentPassword(e.target.value);
                  }}
                  style={{ marginBottom: '16px' }}
                />
                <TextField
                  fullWidth
                  id={'standard-name-required'}
                  name={'email'}
                  type={'email'}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder={'new Email'}
                />
              </div>
              <div style={{ textAlign: 'right', marginTop: '16px' }}>
                <Button
                  onClick={() => {
                    handleClose();
                    setEmail('');
                  }}
                >
                  Cancel
                </Button>
                <Button
                  color='primary'
                  onClick={async () => {
                    handleClose();
                    await changeCurrentEmail(currentPassword, email, setEmail);
                  }}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
};
export default EditEmail;
