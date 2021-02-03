import React from 'react';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from './auth/AuthProvider';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Chat from './components/Chat';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';

const Main = styled.main`
  text-align: center;
  margin: 80px auto 0;
`;

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Main>
          <Container maxWidth='md'>
            <PrivateRoute exact path='/' component={Home} />
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/login' component={Login} />
          </Container>
          <PrivateRoute exact path='/chat/:id' component={Chat} />
        </Main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
