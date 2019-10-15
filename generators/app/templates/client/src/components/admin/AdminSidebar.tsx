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
import cx from 'classnames';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { UserRole } from '../../graphql';
import { RouteHelper } from '../../routes/route-helper';
import Authorised from '../Authorised';

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
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
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
  r: RouteHelper;
}

const ListItemLink = ListItem as any;
// @ts-ignore
const NavLinkRef = React.forwardRef((props, ref) => <NavLink {...props} />);

const AdminSidebar: React.FC<Props> = ({ classes, handleDrawerClose, open, r }) => (
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
      <Authorised roles={UserRole.admin}>
        <ListItemLink
          button
          title="Users"
          component={NavLinkRef}
          to={`/admin/users`}
          activeClassName={classes.active}
          className={classes.linkIcon}
        >
          <ListItemIcon className={classes.icon}>
            <Users />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItemLink>
      </Authorised>
    </List>
  </Drawer>
);

export default withStyles(styles)(AdminSidebar);
