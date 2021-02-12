import React, { useContext, useState } from 'react';
import { AuthContext } from '../auth/AuthProvider.js';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextInputField from './TextInputField';
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Profile = () => {
  const { currentUser, changeCurrentName } = useContext(AuthContext);
  const [currentName, setCurrentName] = useState('');
  const [name, setName] = useState(currentUser.displayName);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{}}>
      <h1>Your Profile</h1>
      <h2>Here you can edit your profile</h2>

      <div
        style={{
          width: '35%',
          margin: '0 auto',
          display: 'flex',
          textAlign: 'left',
          alignItems: 'center',
        }}
      >
        <h3>name: {name}</h3>
        <CreateIcon onClick={handleOpen} />

        <Modal
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <h3>Please enter a new name</h3>
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
                  value={currentName}
                  setName={setCurrentName}
                />
                <CreateIcon
                  onClick={async () => {
                    if (currentName === '') return;
                    handleClose();
                    await changeCurrentName(currentName);
                    setCurrentName('');
                    setName(currentName);
                  }}
                />
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};
export default Profile;
