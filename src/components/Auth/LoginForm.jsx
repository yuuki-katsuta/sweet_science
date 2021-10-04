import { useContext, useState } from 'react';
import { RootContext } from '../../Provider';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import TextInputField from '../InputField/TextInputField';
import BaseButton from '../Button/BaseButton';
import styled from 'styled-components';

const SDescription = styled.div`
  margin-top: 18px;
  color: #666666;
  font-weight: bold;
  _:lang(x) + _:-webkit-full-screen-document,
  p {
    letter-spacing: -1.2px;
  }
`;
const SForm = styled.form`
  width: 100%;
  margin-top: 8px;
`;
const SLoginButton = styled(BaseButton)`
  margin: 24px 0px 16px;
`;
const SGuestLoginButton = styled(BaseButton)`
  margin: 0 0 16px;
`;

const LoginForm = ({ setIsLogin, isLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { guestLogin, login } = useContext(RootContext);
  const resetItems = () => {
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <SDescription>
        <p>
          ボクシングファンのためのチャットアプリ
          <br />
          試合内容や採点結果についてに談論することができます！
        </p>
      </SDescription>
      <SForm noValidate>
        <TextInputField
          variant='outlined'
          margin='normal'
          fullWidth
          id='email'
          label='メールアドレス'
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
          fullWidth
          name='password'
          label='パスワード'
          type='password'
          id='password'
          autoComplete='current-password'
          value={password}
          setState={(e) => {
            setPassword(e.target.value);
          }}
        />
        <SLoginButton
          fullWidth
          variant='contained'
          color='primary'
          setState={() => {
            login(email, password);
          }}
        >
          ログイン
        </SLoginButton>
        <SGuestLoginButton
          fullWidth
          variant='contained'
          color='default'
          setState={() => {
            guestLogin();
          }}
        >
          ゲストログイン
        </SGuestLoginButton>
        <Grid container>
          <Grid item>
            <Link
              onClick={() => {
                resetItems();
                setIsLogin(!isLogin);
              }}
              variant='body2'
            >
              アカウントをお持ちでない方はこちら
            </Link>
          </Grid>
        </Grid>
      </SForm>
    </>
  );
};
export default LoginForm;
