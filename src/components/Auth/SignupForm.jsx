import { useContext, useState } from 'react';
import { AuthContext } from '../../auth/AuthProvider';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 3),
  },
}));

const SignupForm = ({ setIsLogin, isLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const { signup } = useContext(AuthContext);
  const classes = useStyles();
  const resetItems = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
  };

  return (
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
          signup(email, password, confirmPassword, name);
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
  );
};

export default SignupForm;
