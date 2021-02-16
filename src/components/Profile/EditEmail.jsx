import React, { useContext } from 'react';
import { AuthContext } from '../../auth/AuthProvider.js';
import TextInputField from '../TextInputField';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';

const EditEmail = ({ email, setEmail, handleClose }) => {
  const { currentUser, changeCurrentEmail } = useContext(AuthContext);

  return (
    <>
      <h3>Please enter a new Email</h3>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <TextInputField
          id={'standard-name-required'}
          name={'email'}
          type={'email'}
          value={email}
          setName={setEmail}
          placeholder={currentUser.email}
        />
        <IconButton
          onClick={async () => {
            if (email === '' || email === currentUser.email) {
              handleClose();
              return;
            }
            handleClose();
            await changeCurrentEmail(email, setEmail);
          }}
        >
          <CreateIcon />
        </IconButton>
      </div>
    </>
  );
};

export default EditEmail;
