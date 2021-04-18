import PrivateRoute from './PrivateRoute';
import { AuthProvider } from './auth/AuthProvider';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import routes from './router/routes';
import Layout from './components/Layout/Layout';
import Page404 from './components/Page404';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path='/auth' component={Auth} />
            {routes.map((route) => (
              <PrivateRoute
                key={route.path}
                exact
                path={route.path}
                component={route.component}
              />
            ))}
            <Route path='*' component={Page404} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
