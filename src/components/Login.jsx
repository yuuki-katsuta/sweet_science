import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router';
import { AuthContext } from '../auth/AuthProvider';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect } from 'react-router-dom';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, currentUser } = useContext(AuthContext);

  const handleSubmit = () => {
    login(email, password, history);
  };
  return isLoading ? (
    <CircularProgress />
  ) : currentUser ? (
    <Redirect to={'/'} />
  ) : (
    <div>
      <p>ログイン</p>
      <form>
        email
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        password
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          ログイン
        </button>
      </form>
      <button
        onClick={() => {
          history.push('/signup');
        }}
      >
        アカウント作成
      </button>
    </div>
  );
};
export default withRouter(Login);
