import React, { useContext, useState } from 'react';
import { AuthContext } from '../../auth/AuthProvider.js';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const EditEmail = ({ email, setEmail, handleClose }) => {
  const { changeCurrentEmail } = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState('');

  return (
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
  );
};

export default EditEmail;
