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
  const { currentUser, changeCurrentName, changeCurrentEmail } = useContext(
    AuthContext
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isNameChanged, setIsNameChanged] = useState(false);
  const [isEmailChanged, setIsEmailChanged] = useState(false);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setIsNameChanged(false);
    setIsEmailChanged(false);
  };

  const Item = ({ nameSelected, emailSelected, handleOpen }) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {nameSelected && (
          <h3>
            name:
            {!name
              ? currentUser.displayName
              : isNameChanged
              ? currentUser.displayName
              : name}
          </h3>
        )}
        {emailSelected && (
          <h3>
            email:
            {!email
              ? currentUser.email
              : isEmailChanged
              ? currentUser.email
              : email}
          </h3>
        )}
        <CreateIcon
          onClick={() => {
            nameSelected && setIsNameChanged(true);
            emailSelected && setIsEmailChanged(true);
            handleOpen();
          }}
          style={{ margin: '0 0 3px auto' }}
        />
      </div>
    );
  };

  return (
    <div>
      <h1>Your Profile</h1>
      <h2>Here you can edit your profile</h2>

      <div
        style={{
          width: '35%',
          margin: '0 auto',
          textAlign: 'left',
          minWidth: '260px',
        }}
      >
        <Item nameSelected handleOpen={handleOpen} />
        <Item emailSelected handleOpen={handleOpen} />

        <Modal
          className={classes.modal}
          open={open}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              {isNameChanged && (
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
                    <CreateIcon
                      onClick={async () => {
                        if (name === '' || name === currentUser.displayName) {
                          handleClose();
                          return;
                        }
                        handleClose();
                        await changeCurrentName(name);
                      }}
                    />
                  </div>
                </>
              )}
              {isEmailChanged && (
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
                    <CreateIcon
                      onClick={async () => {
                        if (email === '' || email === currentUser.email) {
                          handleClose();
                          return;
                        }
                        handleClose();
                        await changeCurrentEmail(email, setEmail).then();
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};
export default Profile;
