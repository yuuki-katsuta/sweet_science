import { useContext, useState } from 'react';
import { AuthContext } from '../../auth/AuthProvider.js';
import CreateIcon from '@material-ui/icons/Create';
import BaseIconButton from '../Button/BaseIconButton';
import BaseButton from '../Button/BaseButton';
import TextInputField from '../InputField/TextInputField';
import BaseModal from './BaseModal.jsx';

const inputFieldWrapper = { textAlign: 'left' };
const buttonStyle = { margin: '0 0 3px auto' };
const textInputFieldStyle = { textAlign: 'left', marginBottom: '16px' };
const buttonWrapper = { textAlign: 'right', marginTop: '16px' };

const EditEmail = ({ currentUser }) => {
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
        style={buttonStyle}
        onClickHandler={() => {
          handleOpen();
        }}
      >
        <CreateIcon />
      </BaseIconButton>
      <BaseModal open={open}>
        <div style={inputFieldWrapper}>
          <h3>Please enter a new Email</h3>
          <TextInputField
            fullWidth
            type='password'
            label='Current Password'
            placeholder='Current Password'
            value={currentPassword}
            setState={(e) => {
              setCurrentPassword(e.target.value);
            }}
            style={textInputFieldStyle}
          />
          <TextInputField
            fullWidth
            id='standard-name-required'
            name='email'
            type='email'
            value={email}
            setState={(e) => {
              setEmail(e.target.value);
            }}
            placeholder='new Email'
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
              await changeCurrentEmail(currentPassword, email);
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
export default EditEmail;
