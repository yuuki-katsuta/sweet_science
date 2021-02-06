import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router';
import { AuthContext } from '../auth/AuthProvider';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect } from 'react-router-dom';
import TextInputField from './TextInputField';
import Button from '@material-ui/core/Button';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, currentUser } = useContext(AuthContext);

  const handleSubmit = () => {
    login(email, password, history);
  };
  return isLoading ? (
    <CircularProgress style={{ marginTop: '180px' }} />
  ) : currentUser ? (
    <Redirect to={'/'} />
  ) : (
    <div style={{ maxWidth: '552px', margin: '0 auto' }}>
      <h1>ログイン</h1>
      <form>
        <TextInputField
          id={'standard-required'}
          label={'email'}
          name={'email'}
          type={'email'}
          placeholder={'Email'}
          value={email}
          setName={setEmail}
        />
        <TextInputField
          id={'standard-password-input'}
          label={'password'}
          name={'password'}
          type={'password'}
          placeholder={'Pasword'}
          value={password}
          setName={setPassword}
        />
        <div>
          <Button
            variant='outlined'
            style={{ margin: '16px 0' }}
            onClick={handleSubmit}
          >
            ログイン
          </Button>
        </div>
      </form>
      <Button
        onClick={() => {
          history.push('/signup');
        }}
      >
        サインインしてない場合クリック
      </Button>
    </div>
  );
};
export default withRouter(Login);
