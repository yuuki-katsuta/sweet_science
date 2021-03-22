import React, { useContext } from 'react';
import { AuthContext } from '../../auth/AuthProvider.js';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const EditName = ({ name, setName, handleClose }) => {
  const { currentUser, changeCurrentName } = useContext(AuthContext);

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ textAlign: 'left' }}>
        <h3>Please enter a new Name</h3>
        <br />
        <TextField
          fullWidth
          id={'standard-name-required'}
          name={'name'}
          type={'name'}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder={currentUser.displayName}
        />
      </div>
      <div style={{ textAlign: 'right', marginTop: '16px' }}>
        <Button
          onClick={() => {
            handleClose();
            setName('');
          }}
        >
          Cancel
        </Button>
        <Button
          color='primary'
          onClick={async () => {
            handleClose();
            await changeCurrentName(name, setName);
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};
export default EditName;
