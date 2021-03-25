import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';

const useStyles = makeStyles(theme => ({
  page: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    background: theme.palette.grey[50],
  },
  card: {
    width: 400,
  },
  links: {
    margin: theme.spacing(2),

    '& a': {
      color: theme.palette.grey[800],
      textDecoration: 'none',
    },
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'lighter' as 'lighter',
    color: theme.palette.grey[800],
  },
}));

interface Props {
  links?: JSX.Element;
  title: string;
}

const AccountPage: React.FC<Props> = ({ children, links, title }) => {
  const classes = useStyles();
  return (
    <div className={classes.page}>
      <div className={classes.card}>
        <Typography variant="h5" className={classes.title}>
          {title}
        </Typography>

        {children}
      </div>

      <div className={classes.links}>{links}</div>
    </div>
  );
};

export default AccountPage;
