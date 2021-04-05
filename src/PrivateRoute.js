import { useContext } from 'react';
import { Route } from 'react-router-dom';
import { AuthContext } from './auth/AuthProvider';
import Auth from './components/Auth/Auth';
import Page404 from './components/Page404';

const PrivateRoute = ({ component, path, status, ...options }) => {
  const { currentUser } = useContext(AuthContext);
  if (status === 404) return <Route component={Page404} />;
  const Component = currentUser ? component : Auth;

  return <Route {...options} path={path} component={Component} />;
};

export default PrivateRoute;
