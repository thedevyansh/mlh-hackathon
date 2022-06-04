import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import Layout from './components/Layout';
import withAuthorization from './components/hoc/withAuthorization';
import {
  PUBLIC_PAGE,
  NON_LOGGED_ONLY
} from './components/hoc/options';

import { SocketContext, socket } from './contexts/socket';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Rooms from './pages/Rooms';
import ErrorNotFound from './pages/ErrorNotFound';

import '@fontsource/poppins/700.css';
import '@fontsource/poppins/900.css';
import '@fontsource/inter/400.css'
import '@fontsource/inter/700.css'

function App() {
  localStorage.setItem('chakra-ui-color-mode', 'dark');

  return (
    <ChakraProvider theme={theme}>
      <SocketContext.Provider value={socket}>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route
                path='/'
                exact
                component={withAuthorization(Home, PUBLIC_PAGE)}
              />
              <Route
                path='/register'
                exact
                component={withAuthorization(Register, NON_LOGGED_ONLY)}
              />
              <Route
                path='/login'
                exact
                component={withAuthorization(Login, NON_LOGGED_ONLY)}
              />
              <Route
                path='/rooms'
                exact
                component={withAuthorization(Rooms)}
              />
              <Route
                path='/'
                component={withAuthorization(ErrorNotFound, PUBLIC_PAGE)}
              />
            </Switch>
          </Layout>
        </BrowserRouter>
      </SocketContext.Provider>
    </ChakraProvider>
  );
}

export default App;
