import React from 'react';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from './auth/AuthProvider';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Chat from './components/Chat';

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <PrivateRoute exact path='/' component={Home} />
          <PrivateRoute exact path='/chat/:id' component={Chat} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/login' component={Login} />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
