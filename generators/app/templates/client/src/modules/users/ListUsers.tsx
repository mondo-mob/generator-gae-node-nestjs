import { useQuery } from '@apollo/client';
import { CircularProgress, makeStyles, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { includes } from 'lodash';
import * as React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/common/layout/PageHeader';
import PaperSection from '../../components/common/layout/PaperSection';
import { ListUsers as IListUsers, ListUsers_users, UserRole } from '../../graphql';
import { updateUserRoute } from '../../routes/AdminRoutes';
import InviteUserDialog from './InviteUserDialog';
import { listUsersQuery } from './queries';

const useStyles = makeStyles((theme: Theme) => ({
  usernameCell: {
    display: 'flex',
  },
  avatar: {
    height: 16,
    width: 16,
    marginRight: theme.spacing(2),
  },
}));

const isSuper = (user: ListUsers_users) => includes(user.roles, UserRole.super);

const ListUsers = () => {
  const classes = useStyles();
  const { data, loading } = useQuery<IListUsers>(listUsersQuery);
  return (
    <>
      <PageHeader title="Users" breadcrumbElements="Users" actions={<InviteUserDialog />} />
      {loading || !data ? (
        <CircularProgress />
      ) : (
        <PaperSection>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Roles</TableCell>
                <TableCell>Activated</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            {data && data.users && (
              <TableBody>
                {data.users.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className={classes.usernameCell}>
                        <div>{user.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.roles.join(', ')}</TableCell>
                    <TableCell>{user.enabled ? 'Yes' : 'No '}</TableCell>
                    <TableCell>{!isSuper(user) && <Link to={updateUserRoute(user.id)}>Edit</Link>}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </PaperSection>
      )}
    </>
  );
};

export default ListUsers;
