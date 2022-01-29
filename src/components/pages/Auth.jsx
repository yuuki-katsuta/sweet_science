import { useState } from 'react';
import { withRouter } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import LoginForm from '../ui/Auth/LoginForm';
import SignupForm from '../ui/Auth/SignupForm';
import Modal from '@material-ui/core/Modal';
import Box from '@mui/material/Box';
import { TermsText } from '../ui/text/TermsText';
import { PrivacyText } from '../ui/text/PrivacyText';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/collection/96198332)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  textWrapper: {
    width: '100%',
    marginTop: '8px',
  },
  text: {
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '95%',
  minWidth: '270px',
  maxWidth: '800px',
  maxHeight: '450px',
  overflow: 'scroll',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
  outline: 0,
};
const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [open, setOpen] = useState(false);
  const [openTerm, setOpenTerm] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setOpenTerm(false);
  };
  const classes = useStyles();
  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        {isLogin ? (
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Log in
            </Typography>
            <LoginForm setIsLogin={setIsLogin} isLogin={isLogin} />
            <div className={classes.textWrapper}>
              <p
                className={classes.text}
                onClick={() => {
                  setOpenTerm(true);
                  setOpen(true);
                }}
              >
                利用規約
              </p>
              <p className={classes.text} onClick={() => setOpen(true)}>
                プライバシーポリシー
              </p>
            </div>
          </div>
        ) : (
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign up
            </Typography>
            <SignupForm setIsLogin={setIsLogin} isLogin={isLogin} />
          </div>
        )}
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>{openTerm ? <TermsText /> : <PrivacyText />}</Box>
      </Modal>
    </Grid>
  );
};

export default withRouter(Auth);
