import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { UserContext } from './components/context/UserContext';
import Activate from './modules/accounts/Activate';
import ConfirmReset from './modules/accounts/ConfirmReset';
import Reset from './modules/accounts/Reset';
import LogIn from './modules/accounts/SignIn';
import AdminRoutes from './routes/AdminRoutes';
import PublicRoutes from './routes/PublicRoutes';
import RedirectForRoles from './routes/RedirectForRoles';
import UserRoutes from './routes/UserRoutes';

const AppRoutes = () => {
  const { authenticated } = useContext(UserContext);
  return authenticated ? (
    <Switch>
      <Switch>
        <Route path="/public" render={() => <PublicRoutes />} />
        <Route path="/admin" render={() => <AdminRoutes />} />
        <Route path="/user" render={() => <UserRoutes />} />
        <RedirectForRoles roleMappings={{ admin: '/admin', user: '/user' }} defaultRedirect="/signin" />
      </Switch>
    </Switch>
  ) : (
    <Switch>
      <Route path="/signin" component={LogIn} />
      <Route path="/reset" component={Reset} />
      <Route path="/activate/:code" component={Activate} />
      <Route path="/confirm-reset/:code" component={ConfirmReset} />
      <Route path="/public" render={() => <PublicRoutes />} />
      <Redirect to="/signin" />
    </Switch>
  );
};

export default AppRoutes;
