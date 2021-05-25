import { useContext } from 'react';
import { Route } from 'react-router-dom';
import { RootContext } from './Provider';
import Auth from './components/Auth/Auth';

const PrivateRoute = ({ component, path, status, ...options }) => {
  const { currentUser } = useContext(RootContext);
  const Component = currentUser ? component : Auth;
  return <Route {...options} path={path} component={Component} />;
};

export default PrivateRoute;
