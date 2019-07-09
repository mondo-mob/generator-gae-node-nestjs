import { Typography } from '@material-ui/core';
import * as React from 'react';

const Unauthorised = () => (
  <React.Fragment>
    <Typography paragraph variant="h5">
      Unauthorised
    </Typography>

    <Typography variant="body1">You do not have sufficient privileges to access this page.</Typography>
  </React.Fragment>
);

export default Unauthorised;
