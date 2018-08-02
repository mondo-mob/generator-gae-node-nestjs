import {
  CircularProgress,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
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

export const Loading: React.SFC<WithStyles<typeof styles>> = ({ classes }) => (
  <div className={classes.page}>
    <CircularProgress />
    <Typography>Loading...</Typography>
  </div>
);

export default withStyles(styles)(Loading);
