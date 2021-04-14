import { useContext, useState } from 'react';
import { AuthContext } from '../../auth/AuthProvider';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import TextInputField from '../InputField/TextInputField';
import BaseButton from '../Button/BaseButton';

const descriptionStyle = {
  margin: '18px 0 8px',
  color: '#666666',
  fontWeight: 'bold',
};
const formStyle = {
  width: '100%',
  marginTop: '8px',
};
const submitStyle = {
  margin: '24px 0px 24px',
};
const guestLoginStyle = {
  margin: '0 0 16px',
};

const LoginForm = ({ setIsLogin, isLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { guestLogin, login } = useContext(AuthContext);
  const resetItems = () => {
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <div style={descriptionStyle}>
        <p>
          ボクシングファンのためのチャットアプリ
          <br />
          試合内容や採点結果についてに談論することができます！
        </p>
      </div>
      <form className={formStyle} noValidate>
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
          setState={(e) => {
            setEmail(e.target.value);
          }}
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
          setState={(e) => {
            setPassword(e.target.value);
          }}
        />
        <BaseButton
          fullWidth
          variant='contained'
          color='primary'
          style={submitStyle}
          setState={() => {
            login(email, password);
          }}
        >
          Log In
        </BaseButton>
        <BaseButton
          fullWidth
          variant='contained'
          color='default'
          style={guestLoginStyle}
          setState={() => {
            guestLogin();
          }}
        >
          ゲストログイン
        </BaseButton>
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