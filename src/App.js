import PrivateRoute from './PrivateRoute';
import { Provider } from './Provider';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import routes from './router/routes';
import Layout from './Layout/Layout';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Layout>
          <Switch>
            {routes.map((route) => (
              <PrivateRoute
                key={route.path}
                exact
                path={route.path}
                component={route.component}
              />
            ))}
            <Route path='*' render={() => <Redirect to='/' />} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
