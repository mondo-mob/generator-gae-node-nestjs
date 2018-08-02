import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import * as ReactDOM from 'react-dom';

import { CssBaseline } from '@material-ui/core';
import App from './App';
import { DelayLoading } from './components/PageProgressBar';
import Toast from './components/Toast';
import './index.css';
import client from './util/client';

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.Fragment>
      <CssBaseline />
      <DelayLoading />
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <App />
        <Toast />
      </MuiPickersUtilsProvider>
    </React.Fragment>
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement,
);
