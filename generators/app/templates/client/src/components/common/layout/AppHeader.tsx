import { AppBar, Button, IconButton, Theme, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';
import * as React from 'react';
import { ReactElement, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppLogo from '../../../assets/google.svg';
import { UserContext } from '../../context/UserContext';

const useStyles = makeStyles((theme: Theme) => ({
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
  rootLink: {
    flexGrow: 1,
    color: 'white',
    textDecoration: 'none',
  },
  logoAndHeading: {
    display: 'flex',
    alignItems: 'center',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: theme.spacing(2),
  },
  title: {
    color: 'inherit',
    flexGrow: 1,
    fontSize: 18,
  },
  headerItems: {
    display: 'flex',
    '&>:not(:first-child)': {
      marginLeft: theme.spacing(2),
    },
  },
  hidden: {
    display: 'none',
  },
}));

interface BaseHeaderItem {
  when?: boolean;
}

interface HeaderItemLink extends BaseHeaderItem {
  type: 'link' | 'href';
  label: string;
  href: string;
}

interface HeaderItemComponent extends BaseHeaderItem {
  type: 'component';
  component: ReactElement;
}

export type HeaderItem = HeaderItemLink | HeaderItemComponent;

interface Props {
  open: boolean;
  handleDrawerOpen?: () => void;
  showDrawer?: boolean;
  items?: HeaderItem[];
}

const AppHeader: React.FC<Props> = ({ open, items = [], handleDrawerOpen, showDrawer }) => {
  const classes = useStyles();
  const { authenticated } = useContext(UserContext);

  const defaultItems: HeaderItem[] = [
    { type: 'link', label: 'Login', href: '/signin', when: !authenticated },
    { type: 'href', label: 'Logout', href: '/auth/signout/local', when: authenticated },
  ];

  const headerItems = [...items, ...defaultItems]
    .filter(({ when = true }) => when)
    .map((item, index) =>
      item.type === 'component' ? (
        <div key={index}>{(item as HeaderItemComponent).component}</div>
      ) : (
        <HeaderItemLinkButton key={index} item={item as HeaderItemLink} />
      ),
    );

  return (
    <AppBar
      className={classNames(classes.appBar, {
        [classes.appBarShift]: open,
      })}
      position="fixed"
      color="primary"
    >
      <Toolbar>
        <IconButton
          edge="start"
          className={classNames(classes.menuButton, {
            [classes.hidden]: !showDrawer,
          })}
          onClick={handleDrawerOpen}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Link to="/" className={classes.rootLink}>
          <div className={classes.logoAndHeading}>
            <img alt="Logo" className={classes.logo} src={AppLogo} />
            <Typography variant="h4" className={classes.title}>
              Test Nest
            </Typography>
          </div>
        </Link>
        <div className={classes.headerItems}>{headerItems}</div>
      </Toolbar>
    </AppBar>
  );
};

const useStylesLink = makeStyles(theme => ({
  selectedButton: {
    color: theme.palette.primary.main,
    background: theme.palette.background.default,
    '&:hover': {
      background: theme.palette.background.default,
    },
  },
}));

const HeaderItemLinkButton = ({ item: { type, label, href } }: { item: HeaderItemLink }) => {
  const classes = useStylesLink();
  const { pathname } = useLocation();
  return type === 'link' ? (
    <Button
      classes={{ root: pathname.indexOf(href) === 0 ? classes.selectedButton : undefined }}
      to={href}
      component={Link}
      color="inherit"
    >
      {label}
    </Button>
  ) : (
    <Button
      classes={{ root: pathname.indexOf(href) === 0 ? classes.selectedButton : undefined }}
      href={href}
      color="inherit"
    >
      {label}
    </Button>
  );
};

export default AppHeader;
