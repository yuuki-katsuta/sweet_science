import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { AuthContext } from './auth/AuthProvider';
import Auth from './components/Auth/Auth';

const PrivateRoute = ({ component, ...options }) => {
  const { currentUser } = useContext(AuthContext);
  const Component = currentUser ? component : Auth;

  return <Route {...options} component={Component} />;
};

export default PrivateRoute;
