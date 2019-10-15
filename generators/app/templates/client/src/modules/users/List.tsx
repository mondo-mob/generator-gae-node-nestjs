import { makeStyles, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { includes } from 'lodash';
import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { Link } from 'react-router-dom';
import HeaderWithActions from '../../components/HeaderWithActions';
import { ListUsers, ListUsers_users, UserRole } from '../../graphql';
import { listUsersQuery } from './queries';
import InviteUserDialog from './InviteUserDialog';

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

const List: React.FC = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <HeaderWithActions actions={<InviteUserDialog />} title="Users" />
      <Query query={listUsersQuery}>
        {({ data }: QueryResult<ListUsers>) => (
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
                    <TableCell>{!isSuper(user) && <Link to={`/admin/users/${user.id}`}>Edit</Link>}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        )}
      </Query>
    </React.Fragment>
  );
};

export default List;
