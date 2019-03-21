import { StyleRulesCallback, Theme, Typography, withStyles, WithStyles } from '@material-ui/core';
import * as React from 'react';

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    marginRight: theme.spacing.unit / 2,
    fontSize: 20,
    color: 'inherit',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
  },
  actions: {
    '&>*': {
      marginLeft: 10,
    },
  },
});

interface Props extends WithStyles<typeof styles> {
  title: JSX.Element | string;
  actions: JSX.Element;
}

const HeaderWithActions: React.FC<Props> = ({ classes, title, actions }) => (
  <div className={classes.root}>
    <Typography variant="headline">{title}</Typography>
    <div className={classes.actions}>{actions}</div>
  </div>
);

export default withStyles(styles)(HeaderWithActions);
