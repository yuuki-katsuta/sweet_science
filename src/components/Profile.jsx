import React, { useContext, useState } from 'react';
import { AuthContext } from '../auth/AuthProvider.js';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import EditName from './Profile/EditName';
import EditEmail from './Profile/EditEmail';
import EditPassword from './Profile/EditPassword';
import UserImage from './Profile/UserImage';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    height: 'auto',
    width: '40%',
    minWidth: '270px',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isNameChanged, setIsNameChanged] = useState(false);
  const [isEmailChanged, setIsEmailChanged] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setIsNameChanged(false);
    setIsEmailChanged(false);
    setIsPasswordChanged(false);
  };

  const ProfileItem = ({ nameSelected, emailSelected }) => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {nameSelected && (
          <h3>
            Name:&nbsp;&nbsp;
            {!name
              ? currentUser.displayName
              : isNameChanged
              ? currentUser.displayName
              : name}
          </h3>
        )}
        {emailSelected && (
          <h3>
            Email:&nbsp;&nbsp;
            {!email
              ? currentUser.email.length > 20
                ? currentUser.email.substr(0, 20) + '...'
                : currentUser.email
              : isEmailChanged
              ? currentUser.email.length > 20
                ? currentUser.email.substr(0, 20) + '...'
                : currentUser.email
              : email.length > 20
              ? email.substr(0, 20) + '...'
              : email}
          </h3>
        )}
        <IconButton
          style={{ margin: '0 0 3px auto' }}
          onClick={() => {
            nameSelected && setIsNameChanged(true);
            emailSelected && setIsEmailChanged(true);
            handleOpen();
          }}
        >
          <CreateIcon />
        </IconButton>
      </div>
    );
  };

  return (
    <div>
      <h1>Your Profile</h1>
      <h2>Here you can edit your profile</h2>
      <UserImage />
      <div
        style={{
          width: '35%',
          margin: '20px auto 0',
          textAlign: 'left',
          minWidth: '300px',
        }}
      >
        <ProfileItem nameSelected />
        <ProfileItem emailSelected />
      </div>
      <Button
        style={{ margin: '16px auto 42px' }}
        variant='outlined'
        onClick={() => {
          setIsPasswordChanged(true);
          setOpen(true);
        }}
      >
        Change Password
      </Button>
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
              <EditName
                name={name}
                setName={setName}
                handleClose={handleClose}
              />
            )}
            {isEmailChanged && (
              <EditEmail
                email={email}
                setEmail={setEmail}
                handleClose={handleClose}
              />
            )}
            {isPasswordChanged && <EditPassword handleClose={handleClose} />}
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
export default Profile;
