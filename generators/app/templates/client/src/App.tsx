import gql from 'graphql-tag';
import * as _ from 'lodash';
import * as React from 'react';
import { Query } from 'react-apollo';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import Page from './components/Page';
import { Me } from './graphql';
import Activate from './modules/accounts/Activate';
import ConfirmReset from './modules/accounts/ConfirmReset';
import Reset from './modules/accounts/Reset';
import LogIn from './modules/accounts/SignIn';
import Loading from './modules/pages/Loading';
import NotFound from './modules/pages/NotFound';
import List from './modules/users/List';
import UpdateUserPage from './modules/users/Update';

export const meQuery = gql`
  query Me {
    me {
      id
      roles
    }
  }
`;

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <Query<Me> query={meQuery}>
          {({ data, loading }) => {
            if (loading) {
              return <Loading />;
            }

            if (!data || !data.me) {
              return (
                <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route path="/signin" component={LogIn} />
                  <Route path="/reset" component={Reset} />
                  <Route path="/activate/:code" component={Activate} />
                  <Route path="/confirm-reset/:code" component={ConfirmReset} />
                  <Redirect to="/signin" />
                </Switch>
              );
            }

            const { roles } = data.me;

            const hasRole = (role: string, component: React.ComponentType) => {
              if (_.includes(roles, role)) {
                return component;
              }

              return NotFound;
            };

            return (
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route
                  render={() => (
                    <Page>
                      <Switch>
                        <Route
                          path="/users/:userId"
                          component={hasRole('admin', UpdateUserPage)}
                        />
                        <Route
                          exact
                          path="/users"
                          component={hasRole('admin', List)}
                        />
                        <Redirect to="/permits" />
                      </Switch>
                    </Page>
                  )}
                />
              </Switch>
            );
          }}
        </Query>
      </BrowserRouter>
    );
  }
}

export default App;
