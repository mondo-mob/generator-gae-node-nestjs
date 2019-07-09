import { Typography } from '@material-ui/core';
import * as React from 'react';

const NotFound = () => (
  <React.Fragment>
    <Typography paragraph variant="h5">
      Not found
    </Typography>

    <Typography variant="body1">
      The page you were looking for was not found
    </Typography>
  </React.Fragment>
);

export default NotFound;
