import { useContext } from 'react';
import { Route } from 'react-router-dom';
import { AuthStateContext } from './providers/AuthStateProvider';
import Auth from './components/Auth/Auth';

const PrivateRoute = ({ component, path, status, ...options }) => {
  const { currentUser } = useContext(AuthStateContext);
  const Component = currentUser ? component : Auth;
  return <Route {...options} path={path} component={Component} />;
};

export default PrivateRoute;
