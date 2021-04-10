import { useContext, useState } from 'react';
import { AuthContext } from '../../auth/AuthProvider.js';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CreateIcon from '@material-ui/icons/Create';
import BaseIconButton from '../Button/BaseIconButton';
import BaseButton from '../Button/BaseButton';
import TextInputField from '../InputField/TextInputField';

const EditEmail = ({ modal, paper, currentUser }) => {
  const [email, setEmail] = useState('');
  const [isEmailChanged, setIsEmailChanged] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [open, setOpen] = useState(false);
  const { changeCurrentEmail } = useContext(AuthContext);

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
      <BaseIconButton
        style={{ margin: '0 0 3px auto' }}
        onClickHandler={() => {
          handleOpen();
        }}
      >
        <CreateIcon />
      </BaseIconButton>
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
                <TextInputField
                  fullWidth
                  type={'password'}
                  label={'Current Password'}
                  placeholder={'Current Password'}
                  value={currentPassword}
                  setState={setCurrentPassword}
                  style={{ marginBottom: '16px' }}
                />
                <TextInputField
                  fullWidth
                  id={'standard-name-required'}
                  name={'email'}
                  type={'email'}
                  value={email}
                  setState={setEmail}
                  placeholder={'new Email'}
                />
              </div>
              <div style={{ textAlign: 'right', marginTop: '16px' }}>
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
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
};
export default EditEmail;
