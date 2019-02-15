import {
  AppBar,
  IconButton,
  StyleRulesCallback,
  Theme,
  Toolbar,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import cx from 'classnames';
import * as React from 'react';

const styles: StyleRulesCallback = (theme: Theme) => ({
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
});

interface Props extends WithStyles<typeof styles> {
  open: boolean;
  handleDrawerOpen?: () => void;
}

const PageTitle: React.SFC<Props> = ({ open, classes, handleDrawerOpen }) => (
  <AppBar
    position="absolute"
    className={cx(classes.appBar, open && classes.appBarShift)}
  >
    <Toolbar disableGutters={!open}>
      <IconButton
        color="inherit"
        aria-label="Open drawer"
        onClick={handleDrawerOpen}
        className={cx(classes.menuButton, open && classes.hide)}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="title" color="inherit">
        <%= projectName %>
      </Typography>
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(PageTitle);
