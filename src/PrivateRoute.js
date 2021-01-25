import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { AuthContext } from './auth/AuthProvider';
import Login from './components/Login';

const PrivateRoute = ({ component, ...options }) => {
  const { currentUser } = useContext(AuthContext);
  //ログイン未ならLoginコンポーネント表示
  const Component = currentUser ? component : Login;

  return <Route {...options} component={Component} />;
};

export default PrivateRoute;
