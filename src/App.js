import { RecoilRoot } from 'recoil';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import routes from './router/routes';
import Layout from './Layout/Layout';
import { Suspense } from 'react';

const options = {
  timeout: 2500,
  position: positions.BOTTOM_CENTER,
  offset: '30px',
};

function App() {
  return (
    <RecoilRoot>
      <AlertProvider template={AlertTemplate} {...options}>
        <BrowserRouter>
          <Layout>
            <Suspense fallback={null}>
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
            </Suspense>
          </Layout>
        </BrowserRouter>
      </AlertProvider>
    </RecoilRoot>
  );
}

export default App;
