import { Typography } from '@material-ui/core';
import * as React from 'react';

const PublicHome = () => (
  <>
    <Typography paragraph variant="h5">
      Public home page
    </Typography>

    <Typography variant="body1">This page doesn't require any authentication.</Typography>
  </>
);

export default PublicHome;
