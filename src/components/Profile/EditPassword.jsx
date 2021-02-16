import React, { useContext, useState } from 'react';
import { AuthContext } from '../../auth/AuthProvider.js';
import TextInputField from '../TextInputField';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';

const EditPassword = ({ handleClose }) => {
  const { ChangeCurrentPassword } = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <>
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
    </>
  );
};
export default EditPassword;
