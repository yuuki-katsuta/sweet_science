import PrivateRoute from './PrivateRoute';
import { AuthProvider } from './auth/AuthProvider';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import routes from './router/routes';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Route exact path='/auth' component={Auth} />
        <Layout>
          <Switch>
            {routes.map((route) => (
              <PrivateRoute
                key={route.path}
                exact
                path={route.path}
                component={route.component}
                status={route.status}
              />
            ))}
          </Switch>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
