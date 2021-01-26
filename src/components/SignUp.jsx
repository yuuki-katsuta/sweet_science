import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../auth/AuthProvider';

const SignUp = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { signup, currentUser } = useContext(AuthContext);

  const handleSubmit = () => {
    signup(email, password, name, history);
  };

  return currentUser ? (
    <Redirect to={'/'} />
  ) : (
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
      </form>
      <div>
        <button
          onClick={() => {
            history.push('/login');
          }}
        >
          サインイン済みの場合クリック
        </button>
      </div>
    </div>
  );
};
export default withRouter(SignUp);
