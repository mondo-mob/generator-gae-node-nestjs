import {
  Avatar,
  StyleRulesCallback,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { Link } from 'react-router-dom';
import HeaderWithActions from '../../components/HeaderWithActions';
import { showMessage } from '../../components/Toast';
import { ListUsers } from '../../graphql';
import { requestJSON } from '../../util/http';
import { InviteUserDialog } from './InviteUserDialog';
import { listUsersQuery } from './queries';

const styles: StyleRulesCallback = (theme: Theme) => ({
  usernameCell: {
    display: 'flex',
  },
  avatar: {
    height: 16,
    width: 16,
    marginRight: theme.spacing.unit * 2,
  },
});

const reinviteUser = async (userId: string) => {
  await requestJSON('/auth/re-invite', 'post', { userId })
    .then(inviteResponse => showMessage('Invitation email has been resent'))
    .catch(() => showMessage('Error reinviting the user.', true));
};

const List: React.FC<WithStyles<typeof styles>> = ({ classes }) => (
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
                      <Avatar className={classes.avatar} src={user.avatar.url || undefined} />
                      <div>{user.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.roles.join(', ')}</TableCell>
                  <TableCell>
                    {user.enabled ? 'Yes' : 'No '}
                    {!user.enabled && (
                      <a href="#" onClick={() => reinviteUser(user.id)}>
                        (Reinvite)
                      </a>
                    )}
                  </TableCell>
                  <TableCell>
                    <Link to={`/admin/users/${user.id}`}>Edit</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      )}
    </Query>
  </React.Fragment>
);

export default withStyles(styles)(List);
