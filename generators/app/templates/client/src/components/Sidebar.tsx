import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Users from '@material-ui/icons/SupervisorAccount';
import * as cx from 'classnames';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

const styles = (theme: Theme) => ({
  drawerPaper: {
    position: 'relative' as 'relative',
    whiteSpace: 'nowrap' as 'nowrap',
    width: 200,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    height: '100%',
  },
  drawerPaperClose: {
    overflowX: 'hidden' as 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  active: {},
  icon: {
    color: 'inherit',
  },
  linkIcon: {
    color: theme.palette.grey.A700,
    '&$active': {
      color: theme.palette.primary.main,
    },
  },
});

interface Props extends WithStyles<typeof styles> {
  open: boolean;
  handleDrawerClose?: () => void;
}

const ListItemLink = ListItem as any;

const Sidebar: React.SFC<Props> = ({ classes, handleDrawerClose, open }) => (
  <Drawer
    variant="permanent"
    classes={{
      paper: cx(classes.drawerPaper, !open && classes.drawerPaperClose),
    }}
    open={open}
  >
    <div className={classes.toolbar}>
      <IconButton onClick={handleDrawerClose}>
        <ChevronLeftIcon />
      </IconButton>
    </div>
    <Divider />
    <List>
      <ListItemLink
        button
        title="Users"
        component={NavLink}
        to={`/users`}
        activeClassName={classes.active}
        className={classes.linkIcon}
      >
        <ListItemIcon className={classes.icon}>
          <Users />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItemLink>
    </List>
  </Drawer>
);

export default withStyles(styles)(Sidebar);
