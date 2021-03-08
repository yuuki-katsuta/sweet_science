import React from 'react';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from './auth/AuthProvider';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home';
import Auth from './components/Auth/Auth';
import Chat from './components/Chat';
import Profile from './components/Profile/Profile';
import About from './components/About';
import Container from '@material-ui/core/Container';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Route exact path='/auth' component={Auth} />
        <PrivateRoute exact path='/' component={Home} />
        <Container maxWidth='md'>
          <PrivateRoute exact path='/profile' component={Profile} />
          <PrivateRoute exact path='/about' component={About} />
        </Container>
        <PrivateRoute exact path='/chat/:id' component={Chat} />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
