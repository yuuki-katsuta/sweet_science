import { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import TextInputField from '../InputField/TextInputField';
import BaseButton from '../Button/BaseButton';
import styled from 'styled-components';

const SForm = styled.form`
  width: 100%;
  margintop: 16px;
`;
const SSignupButton = styled(BaseButton)`
  margin: 24px 0 16px;
`;

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
    <SForm noValidate>
      <TextInputField
        variant='outlined'
        margin='normal'
        fullWidth
        id='name'
        label='ニックネーム(10文字以内)'
        name='name'
        autoFocus
        value={name}
        setState={(e) => {
          setName(e.target.value);
        }}
      />
      <TextInputField
        variant='outlined'
        margin='normal'
        fullWidth
        id='email'
        label='メールアドレス'
        name='email'
        value={email}
        setState={(e) => {
          setEmail(e.target.value);
        }}
      />
      <TextInputField
        autoComplete='autoComplete'
        variant='outlined'
        margin='normal'
        fullWidth
        name='password'
        label='パスワード'
        type='password'
        id='password'
        value={password}
        setState={(e) => {
          setPassword(e.target.value);
        }}
      />
      <TextInputField
        autoComplete='autoComplete'
        variant='outlined'
        margin='normal'
        fullWidth
        name='password'
        label='パスワード確認'
        type='password'
        id='confirm Password'
        value={confirmPassword}
        setState={(e) => {
          setConfirmPassword(e.target.value);
        }}
      />
      <SSignupButton
        fullWidth
        variant='contained'
        color='primary'
        setState={() => {
          signup(email, password, confirmPassword, name);
        }}
      >
        サインアップ
      </SSignupButton>
      <Grid container>
        <Grid item>
          <Link
            onClick={() => {
              resetItems();
              setIsLogin(!isLogin);
            }}
            variant='body2'
          >
            すでにアカウントを作られた方はこちら
          </Link>
        </Grid>
      </Grid>
    </SForm>
  );
};

export default SignupForm;
