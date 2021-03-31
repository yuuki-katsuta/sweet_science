import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import UserImage from './UserImage';
import EditName from './EditName';
import EditEmail from './EditEmail';
import EditPassword from './EditPassword';

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
    maxWidth: '650px',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  title: {
    marginBottom: '16px',
    color: '#666666',
    fontWeight: 'bold',
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const Profile = () => {
  const classes = useStyles();
  return (
    <div className='container'>
      <Container maxWidth='md'>
        <h2>Your Profile</h2>
        <div className={classes.title}>
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
          <div className={classes.profile}>
            <EditName modal={classes.modal} paper={classes.paper} />
          </div>
          <div className={classes.profile}>
            <EditEmail modal={classes.modal} paper={classes.paper} />
          </div>
        </div>
        <EditPassword modal={classes.modal} paper={classes.paper} />
      </Container>
    </div>
  );
};
export default Profile;
