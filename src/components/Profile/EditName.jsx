import React, { useCallback, useContext, useState } from 'react';
import { AuthContext } from '../../auth/AuthProvider.js';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const EditName = ({ modal, paper }) => {
  const [isNameChanged, setIsNameChanged] = useState(false);
  const [name, setName] = useState('');
  const { currentUser, changeCurrentName } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setIsNameChanged(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <h3>
        Name:&nbsp;&nbsp;
        {!name || isNameChanged ? currentUser.displayName : name}
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
          </div>
        </Fade>
      </Modal>
    </>
  );
};
export default EditName;
