import PrivateRoute from './PrivateRoute';
import { Provider } from './Provider';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import routes from './router/routes';
import Layout from './Layout/Layout';

const options = {
  timeout: 2500,
  position: positions.BOTTOM_CENTER,
  offset: '30px',
};

function App() {
  return (
    <AlertProvider template={AlertTemplate} {...options}>
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
    </AlertProvider>
  );
}

export default App;
