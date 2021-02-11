import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../auth/AuthProvider';
import TextInputField from './TextInputField';
import Button from '@material-ui/core/Button';

const SignUp = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const { signup, currentUser } = useContext(AuthContext);

  return currentUser ? (
    <Redirect to={'/'} />
  ) : (
    <div>
      <h1>サインイン</h1>
      <form>
        <TextInputField
          id={'standard-name-required'}
          label={'Name'}
          name={'name'}
          type={'name'}
          value={name}
          setName={setName}
        />
        <TextInputField
          id={'standard-required'}
          label={'Email'}
          name={'email'}
          type={'email'}
          value={email}
          setName={setEmail}
        />
        <TextInputField
          id={'standard-password-input'}
          label={'Password'}
          name={'password'}
          type={'password'}
          value={password}
          setName={setPassword}
        />
        <TextInputField
          id={'standard-Password-input'}
          label={'Confirm Password'}
          name={'password'}
          type={'password'}
          value={confirmPassword}
          setName={setConfirmPassword}
        />
        <div>
          <Button
            variant='outlined'
            style={{ margin: '16px 0' }}
            onClick={() => {
              signup(email, password, confirmPassword, name, history);
            }}
          >
            サインイン
          </Button>
        </div>
      </form>
      <Button
        onClick={() => {
          history.push('/login');
        }}
      >
        サインイン済みの場合クリック
      </Button>
    </div>
  );
};
export default withRouter(SignUp);
