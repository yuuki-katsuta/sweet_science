import React, { useContext, useState } from 'react';
import { AuthContext } from '../../auth/AuthProvider.js';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import EditName from './EditName';
import EditEmail from './EditEmail';
import EditPassword from './EditPassword';
import UserImage from './UserImage';
import Container from '@material-ui/core/Container';

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
  const [open, setOpen] = useState(false);
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
            {!name || isNameChanged ? currentUser.displayName : name}
          </h3>
        )}
        {emailSelected && (
          <h3>
            Email:&nbsp;&nbsp;
            {!email || isEmailChanged
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
    <div className='container'>
      <Container maxWidth='md'>
        <h2>Your Profile</h2>

        <div
          style={{
            marginBottom: '16px',
            color: '#666666',
            fontWeight: 'bold',
          }}
        >
          <p>プロフィール情報を編集することができます</p>
        </div>

        <UserImage />
        <div
          style={{
            width: '35%',
            margin: '0 auto ',
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
      </Container>
    </div>
  );
};
export default Profile;
