import * as React from 'react';
import { useState } from 'react';
import { Query } from '@apollo/client/react/components';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Me, Me_me } from './graphql';
import Activate from './modules/accounts/Activate';
import ConfirmReset from './modules/accounts/ConfirmReset';
import Reset from './modules/accounts/Reset';
import LogIn from './modules/accounts/SignIn';
import Loading from './modules/pages/Loading';
import Unauthorised from './modules/pages/Unauthorised';
import { meQuery } from './modules/users/queries';
import AdminRoutes from './routes/AdminRoutes';
import PublicRoutes from './routes/PublicRoutes';
import RedirectForRoles from './routes/RedirectForRoles';
import { RouteHelper } from './routes/route-helper';
import UserRoutes from './routes/UserRoutes';

export const UserContext = React.createContext(null as (Me_me | null));

const App: React.FC = () => {
  const [user, setUser] = useState(null as (Me_me | null));
  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <Query<Me> query={meQuery}>
          {({ data, loading }) => {
            if (loading) {
              return <Loading />;
            }

            if (user === null) {
              setUser(data ? data.me : null);
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
                  <Route path="/user" render={() => <UserRoutes r={r} />} />
                  <RedirectForRoles r={r} roleMappings={{ admin: '/admin', user: '/user' }} defaultRedirect="/signin" />
                </Switch>
              </Switch>
            );
          }}
        </Query>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
