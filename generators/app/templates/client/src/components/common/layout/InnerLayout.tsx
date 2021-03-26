import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  content: {
    marginTop: theme.spacing(4),
  },
}));

const InnerLayout: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <Container maxWidth="lg" className={classes.content}>
      <>{children}</>
    </Container>
  );
};

export default InnerLayout;
