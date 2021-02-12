import React from 'react';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from './auth/AuthProvider';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Chat from './components/Chat';
import Profile from './components/Profile';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';

const Main = styled.main`
  text-align: center;
  margin: 120px auto 0;
`;
const Auth = styled.div`
  text-align: center;
  margin: 100px auto 0;
`;

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Container maxWidth='sm'>
          <Auth>
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/login' component={Login} />
          </Auth>
        </Container>
        <Main>
          <Container maxWidth='md'>
            <PrivateRoute exact path='/' component={Home} />
            <PrivateRoute exact path='/profile' component={Profile} />
          </Container>
          <PrivateRoute exact path='/chat/:id' component={Chat} />
        </Main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
