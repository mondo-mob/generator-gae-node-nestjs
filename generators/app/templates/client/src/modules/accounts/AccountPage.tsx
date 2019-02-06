import { StyleRulesCallback, Theme, Typography, withStyles, WithStyles } from '@material-ui/core';
import * as React from 'react';

const styles: StyleRulesCallback = (theme: Theme) => ({
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
    margin: theme.spacing.unit * 2,

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
});

interface Props extends WithStyles<typeof styles> {
  links?: JSX.Element;
  title: string;
}

const AccountPage: React.SFC<Props> = ({ classes, children, links, title }) => (
  <div className={classes.page}>
    <div className={classes.card}>
      <Typography variant="headline" className={classes.title}>
        {title}
      </Typography>

      {children}
    </div>

    <div className={classes.links}>{links}</div>
  </div>
);

export default withStyles(styles)(AccountPage);
