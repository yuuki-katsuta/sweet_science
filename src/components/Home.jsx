import React from 'react';
import { AuthContext } from '../auth/AuthProvider';
import { auth } from '../base';

const Home = ({ history }) => {
  return (
    <div>
      <p>home</p>
      <button
        onClick={() => {
          auth.signOut();
        }}
      >
        ログアウト
      </button>
    </div>
  );
};
export default Home;
