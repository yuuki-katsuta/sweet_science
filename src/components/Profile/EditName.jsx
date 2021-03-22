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
      <TextInputField
        id={'standard-name-required'}
        name={'name'}
        type={'name'}
        value={name}
        setName={setName}
        placeholder={currentUser.displayName}
      />
      <IconButton
        style={{
          display: 'flex',
          margin: '0 0 0 auto',
        }}
        onClick={async () => {
          handleClose();
          await changeCurrentName(name, setName);
        }}
      >
        <CreateIcon />
      </IconButton>
    </>
  );
};
export default EditName;
