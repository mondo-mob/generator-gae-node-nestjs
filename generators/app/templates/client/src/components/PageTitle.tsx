import { AppBar, Button, IconButton, Theme, Toolbar, Typography, WithStyles, withStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import cx from 'classnames';
import * as React from 'react';
import { RouteHelper } from '../routes/route-helper';

const styles = (theme: Theme) => ({
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: 200,
    width: `calc(100% - ${200}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  title: {
    paddingLeft: 10,
  },
  loginButton: {
    position: 'absolute' as 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
});

interface Props extends WithStyles<typeof styles> {
  open: boolean;
  handleDrawerOpen?: () => void;
  showDrawer?: boolean;
  r: RouteHelper;
}

const PageTitle: React.FC<Props> = ({ open, classes, handleDrawerOpen, showDrawer, r }) => (
  <AppBar position="absolute" className={cx(classes.appBar, open && classes.appBarShift)}>
    <Toolbar disableGutters={!open}>
      {showDrawer && (
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={handleDrawerOpen}
          className={cx(classes.menuButton, open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
      )}

      <Typography className={classes.title} variant="h6" color="inherit">
        Test Nest
      </Typography>
      {r.isNotAuthenticated() && (
        <Button href="/signin" type="button" color="primary" variant="contained" className={classes.loginButton}>
          Login
        </Button>
      )}
      {r.isAuthenticated() && (
        <Button
          href="/auth/signout/local"
          type="button"
          color="primary"
          variant="contained"
          className={classes.loginButton}
        >
          Logout
        </Button>
      )}
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(PageTitle);
