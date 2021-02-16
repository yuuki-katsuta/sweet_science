import React, { useContext } from 'react';
import { AuthContext } from '../../auth/AuthProvider.js';
import TextInputField from '../TextInputField';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';

const EditName = ({ name, setName, handleClose }) => {
  const { currentUser, changeCurrentName } = useContext(AuthContext);

  return (
    <>
      <h3>Please enter a new Name</h3>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <TextInputField
          id={'standard-name-required'}
          name={'name'}
          type={'name'}
          value={name}
          setName={setName}
          placeholder={currentUser.displayName}
        />
        <IconButton
          onClick={async () => {
            if (name === '' || name === currentUser.displayName) {
              handleClose();
              return;
            }
            handleClose();
            await changeCurrentName(name, setName);
          }}
        >
          <CreateIcon />
        </IconButton>
      </div>
    </>
  );
};
export default EditName;
