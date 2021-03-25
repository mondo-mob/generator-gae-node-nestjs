import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { FC, useState } from 'react';
import AppHeader from '../common/layout/AppHeader';

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

const PublicLayout: FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  return (
    <div>
      <AppHeader open={open} handleDrawerOpen={() => setOpen(true)} showDrawer />
      <main className={classes.root}>
        <div className={classes.content}>
          <div className={classes.toolbar} />
          <div>{children}</div>
        </div>
      </main>
    </div>
  );
};
export default PublicLayout;
