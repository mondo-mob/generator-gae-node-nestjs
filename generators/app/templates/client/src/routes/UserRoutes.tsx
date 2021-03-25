import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AdminLayout from '../components/admin/AdminLayout';
import { UserRole } from '../graphql';
import UserHome from '../modules/user/UserHome';

const UserRoutes = () => (
  <AdminLayout anyRoles={[UserRole.user]}>
    <Switch>
      <Route path="/user/home" component={UserHome} />
      <Redirect to="/user/home" />
    </Switch>
  </AdminLayout>
);

export default UserRoutes;
