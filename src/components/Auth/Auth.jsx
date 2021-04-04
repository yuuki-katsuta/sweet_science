import { useContext, useState } from 'react';
import { withRouter } from 'react-router';
import { AuthContext } from '../../auth/AuthProvider';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

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
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 3),
  },
  guestLogin: {
    margin: theme.spacing(0, 0, 2),
  },
}));

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const { login, signup, isLoading, currentUser, guestLogin } = useContext(
    AuthContext
  );

  const handleSubmit = () => {
    isLogin
      ? login(email, password)
      : signup(email, password, confirmPassword, name);
  };
  const classes = useStyles();
  const resetItems = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
  };

  return isLoading ? (
    <div style={{ marginTop: '180px', textAlign: 'center' }}>
      <CircularProgress />
    </div>
  ) : currentUser ? (
    <Redirect to={'/'} />
  ) : (
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
            <div
              style={{
                margin: '18px 0 8px',
                color: '#666666',
                fontWeight: 'bold',
              }}
            >
              <p>
                ボクシングファンのためのチャットアプリ
                <br />
                試合内容や採点結果についてに談論することができます！
              </p>
            </div>

            <form className={classes.form} noValidate>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                autoFocus
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Button
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                onClick={() => {
                  handleSubmit();
                }}
              >
                Log In
              </Button>
              <Button
                fullWidth
                variant='contained'
                color='default'
                className={classes.guestLogin}
                onClick={() => {
                  guestLogin();
                }}
              >
                ゲストログイン
              </Button>

              <Grid container>
                <Grid item>
                  <Link
                    onClick={() => {
                      resetItems();
                      setIsLogin(!isLogin);
                    }}
                    variant='body2'
                  >
                    {"Don't have an account? Sign up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        ) : (
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign up
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='name'
                label='Name'
                name='name'
                autoFocus
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='password'
                label='Confirm Password'
                type='password'
                id='confirm Password'
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              <Button
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                onClick={() => {
                  handleSubmit();
                }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                    onClick={() => {
                      resetItems();
                      setIsLogin(!isLogin);
                    }}
                    variant='body2'
                  >
                    {'Already have an account? Log in'}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default withRouter(Auth);
