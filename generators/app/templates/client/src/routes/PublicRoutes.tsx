import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PublicLayout from '../components/public/PublicLayout';
import PublicHome from '../modules/public/PublicHome';

const PublicRoutes = () => (
  <PublicLayout>
    <Switch>
      <Route path="/public/home" component={PublicHome} />
      <Redirect to="/public/home" />
    </Switch>
  </PublicLayout>
);

export default PublicRoutes;
