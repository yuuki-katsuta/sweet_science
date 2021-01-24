import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router';
import { AuthContext } from '../auth/AuthProvider';

const SignUp = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { signup } = useContext(AuthContext);

  const handleSubmit = () => {
    signup(email, password, name, history);
  };

  return (
    <div>
      <form>
        <p>サインイン</p>
        name
        <input
          name='name'
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        email
        <input
          name='email'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        password
        <input
          name='password'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            サインイン
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              history.push('/login');
            }}
          >
            サインイン済みの場合クリック
          </button>
        </div>
      </form>
    </div>
  );
};
export default withRouter(SignUp);
