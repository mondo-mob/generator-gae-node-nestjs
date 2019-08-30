import { CircularProgress, Typography, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

const styles = {
  page: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center',
    alignItems: 'center',

    '& :first-child': {
      marginBottom: 20,
    },
  },
};

interface Props extends WithStyles<typeof styles> {
  message?: string
}

const Loading: React.FC<Props> = ({ classes, message }) => (
  <div className={classes.page}>
    <CircularProgress />
    <Typography>{message ? message : "Loading..."}</Typography>
  </div>
);

export default withStyles(styles)(Loading);
