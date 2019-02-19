import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Me } from './graphql';
import Activate from './modules/accounts/Activate';
import ConfirmReset from './modules/accounts/ConfirmReset';
import Reset from './modules/accounts/Reset';
import LogIn from './modules/accounts/SignIn';
import Loading from './modules/pages/Loading';
import Unauthorised from './modules/pages/Unauthorised';
import AdminRoutes from './routes/AdminRoutes';
import PublicRoutes from './routes/PublicRoutes';
import RedirectForRoles from './routes/RedirectForRoles';
import { RouteHelper } from './routes/route-helper';

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

            const r = new RouteHelper(Unauthorised, data && data.me);

            if (r.isNotAuthenticated()) {
              return (
                <Switch>
                  <Route path="/signin" component={LogIn} />
                  <Route path="/reset" component={Reset} />
                  <Route path="/activate/:code" component={Activate} />
                  <Route path="/confirm-reset/:code" component={ConfirmReset} />
                  <Route path="/public" render={() => <PublicRoutes r={r} />} />
                  <Redirect to="/signin" />
                </Switch>
              );
            }

            return (
              <Switch>
                <Switch>
                  <Route path="/admin" render={() => <AdminRoutes r={r} />} />
                  <RedirectForRoles r={r} roleMappings={{ admin: '/admin' }} defaultRedirect="/public" />
                </Switch>
              </Switch>
            );
          }}
        </Query>
      </BrowserRouter>
    );
  }
}

export default App;
