import PrivateRoute from './PrivateRoute';
import { AuthProvider } from './auth/AuthProvider';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Auth from './components/Auth/Auth';
import routes from './router/routes';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Route exact path='/auth' component={Auth} />
        {routes.map((route) => (
          <PrivateRoute
            key={route.path}
            exact
            path={route.path}
            component={route.component}
          />
        ))}
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
