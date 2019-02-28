import { Typography } from '@material-ui/core';
import * as React from 'react';

const PublicHome = () => (
  <React.Fragment>
    <Typography paragraph variant="headline">
      Public home page
    </Typography>

    <Typography variant="body1">This page doesn't require any authentication.</Typography>
  </React.Fragment>
);

export default PublicHome;