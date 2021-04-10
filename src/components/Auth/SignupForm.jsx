import { useContext, useState } from 'react';
import { AuthContext } from '../../auth/AuthProvider';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import TextInputField from '../InputField/TextInputField';
import BaseButton from '../Button/BaseButton';

const Form = {
  width: '100%',
  marginTop: '16px',
};
const Submit = {
  margin: '24px 0 16px',
};

const SignupForm = ({ setIsLogin, isLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const { signup } = useContext(AuthContext);
  const resetItems = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
  };

  return (
    <form className={Form} noValidate>
      <TextInputField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        id='name'
        label='Name'
        name='name'
        autoFocus
        value={name}
        setState={setName}
      />
      <TextInputField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        id='email'
        label='Email Address'
        name='email'
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
        value={password}
        setState={setPassword}
      />
      <TextInputField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        name='password'
        label='Confirm Password'
        type='password'
        id='confirm Password'
        value={confirmPassword}
        setState={setConfirmPassword}
      />
      <BaseButton
        fullWidth
        variant='contained'
        color='primary'
        style={Submit}
        setState={() => {
          signup(email, password, confirmPassword, name);
        }}
      >
        Sign Up
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
            {'Already have an account? Log in'}
          </Link>
        </Grid>
      </Grid>
    </form>
  );
};

export default SignupForm;
