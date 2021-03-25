import { MuiThemeProvider } from '@material-ui/core';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { UserContextProvider } from './components/context/UserContext';
import theme from './theme';

const App: React.FC = () => (
  <MuiThemeProvider theme={theme}>
    <UserContextProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </UserContextProvider>
  </MuiThemeProvider>
);

export default App;
