import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { FC, useContext, useState } from 'react';
import { UserRole } from '../../graphql';
import Unauthorised from '../../modules/pages/Unauthorised';
import AppHeader from '../common/layout/AppHeader';
import { UserContext } from '../context/UserContext';
import AdminSidebar from './AdminSidebar';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'row' as 'row',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));

interface Props {
  anyRoles: UserRole[];
}

const AdminLayout: FC<Props> = ({ anyRoles, children }) => {
  const [open, setOpen] = useState(false);
  const { hasRole } = useContext(UserContext);
  const classes = useStyles();

  if (!hasRole(...anyRoles)) {
    return <Unauthorised />;
  }

  return (
    <div>
      <AppHeader open={open} handleDrawerOpen={() => setOpen(true)} showDrawer />
      <main className={classes.root}>
        <AdminSidebar open={open} handleDrawerClose={() => setOpen(false)} />
        <div className={classes.content}>
          <div className={classes.toolbar} />
          <div>{children}</div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
