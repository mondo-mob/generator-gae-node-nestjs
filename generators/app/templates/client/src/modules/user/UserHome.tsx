import { Typography } from '@material-ui/core';
import * as React from 'react';

const UserHome = () => (
  <React.Fragment>
    <Typography paragraph variant="headline">
      User home page
    </Typography>

    <Typography variant="body1">This page is for logged in users.</Typography>
  </React.Fragment>
);

export default UserHome;
