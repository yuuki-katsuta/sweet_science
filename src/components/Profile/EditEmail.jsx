import React, { useContext, useState } from 'react';
import { AuthContext } from '../../auth/AuthProvider.js';
import TextInputField from '../TextInputField';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';

const EditEmail = ({ email, setEmail, handleClose }) => {
  const { currentUser, changeCurrentEmail } = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState('');

  return (
    <>
      <h3>Please enter a new Email</h3>
      <div>
        <TextInputField
          type={'password'}
          value={currentPassword}
          setName={setCurrentPassword}
          label={'Current Password'}
          placeholder={'Current Password'}
        />
        <TextInputField
          id={'standard-name-required'}
          name={'email'}
          type={'email'}
          value={email}
          setName={setEmail}
          placeholder={currentUser.email}
        />
        <IconButton
          style={{
            display: 'flex',
            margin: '0 0 0 auto',
          }}
          onClick={async () => {
            if (email === '' || email === currentUser.email) {
              handleClose();
              return;
            }
            handleClose();
            await changeCurrentEmail(currentPassword, email, setEmail);
          }}
        >
          <CreateIcon />
        </IconButton>
      </div>
    </>
  );
};

export default EditEmail;
