import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AdminLayout from '../components/admin/AdminLayout';
import { UserContext } from '../components/context/UserContext';
import { UserRole } from '../graphql';
import ListUsers from '../modules/users/ListUsers';
import UpdateUser from '../modules/users/UpdateUser';

export const listUsersRoute = '/admin/users';
export const updateUserRoute = (id: string) => `/admin/users/${id}`;

const AdminRoutes = () => {
  const { ifHasRole } = useContext(UserContext);

  return (
    <AdminLayout anyRoles={[UserRole.admin, UserRole.super]}>
      <Switch>
        <Route path="/admin/users/:userId" component={ifHasRole(UpdateUser, UserRole.admin)} />
        <Route exact path={listUsersRoute} component={ifHasRole(ListUsers, UserRole.admin)} />
        <Redirect to="/admin/users" />
      </Switch>
    </AdminLayout>
  );
};

export default AdminRoutes;
