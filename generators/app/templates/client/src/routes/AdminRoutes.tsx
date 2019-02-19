import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AdminLayout from '../components/admin/AdminLayout';
import List from '../modules/users/List';
import UpdateUserPage from '../modules/users/Update';
import { RouteHelper } from './route-helper';

interface Props {
  r: RouteHelper;
}

const AdminRoutes: React.FC<Props> = ({ r }) => (
  <AdminLayout r={r} anyRoles={['admin', 'super']}>
    <Switch>
      <Route path="/admin/users/:userId" component={r.ifHasAnyRole(UpdateUserPage, 'admin')} />
      <Route exact path="/admin/users" component={r.ifHasAnyRole(List, 'admin')} />
      <Redirect to="/admin/users" />
    </Switch>
  </AdminLayout>
);

export default AdminRoutes;
