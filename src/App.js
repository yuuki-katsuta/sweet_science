import React from 'react';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from './auth/AuthProvider';
import { BrowserRouter, Route } from 'react-router-dom';
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
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Container maxWidth='sm'>
            <Main>
              <PrivateRoute exact path='/' component={Home} />
              <PrivateRoute exact path='/chat/:id' component={Chat} />
              <Route exact path='/signup' component={SignUp} />
              <Route exact path='/login' component={Login} />
            </Main>
          </Container>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
