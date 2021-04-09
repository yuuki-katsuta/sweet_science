import { useContext, useState } from 'react';
import { AuthContext } from '../../auth/AuthProvider';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import TextInputField from '../TextInputField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
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

const LoginForm = ({ setIsLogin, isLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { guestLogin, login } = useContext(AuthContext);
  const classes = useStyles();
  const resetItems = () => {
    setEmail('');
    setPassword('');
  };

  return (
    <>
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
        <TextInputField
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
          setState={setEmail}
        />
        <TextInputField
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
          setState={setPassword}
        />
        <Button
          fullWidth
          variant='contained'
          color='primary'
          className={classes.submit}
          onClick={() => {
            login(email, password);
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
    </>
  );
};
export default LoginForm;
