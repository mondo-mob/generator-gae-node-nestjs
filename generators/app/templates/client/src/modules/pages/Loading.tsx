import { CircularProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';

const useStyles = makeStyles({
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
});

interface Props {
  message?: string;
}

const Loading: React.FC<Props> = ({ message }) => {
  const classes = useStyles();
  return (
    <div className={classes.page}>
      <CircularProgress />
      <Typography>{message ? message : 'Loading...'}</Typography>
    </div>
  );
};

export default Loading;
