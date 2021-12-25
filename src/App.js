import { AuthProvider } from './providers/AuthProvider';
import { AuthStateProvider } from './providers/AuthStateProvider';
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
    <AuthStateProvider>
      <AlertProvider template={AlertTemplate} {...options}>
        <AuthProvider>
          <BrowserRouter>
            <Layout>
              <Switch>
                {routes.map((route) => (
                  <Route
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
        </AuthProvider>
      </AlertProvider>
    </AuthStateProvider>
  );
}

export default App;
