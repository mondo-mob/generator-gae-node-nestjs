import { Snackbar, SnackbarContent } from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import { makeStyles } from '@material-ui/core/styles';
import cx from 'classnames';
import * as React from 'react';
import { useState } from 'react';

interface NestHttpException {
  statusCode: number;
  error: string;
  message: string;
}

let showToast: (message: string | NestHttpException, isError: boolean) => void = (
  _message: string | NestHttpException,
  _isError: boolean,
) => {
  // do nothing by default
};

const useStyles = makeStyles(theme => ({
  snackbar: {
    marginBottom: theme.spacing(2),
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  success: {
    backgroundColor: green[600],
  },
  '@media(max-width: 1024px)': {
    snackbar: {
      marginBottom: 0,
    },
  },
}));

const Toast = () => {
  const classes = useStyles();
  const [message, setMessage] = useState<string | NestHttpException>();
  const [open, setOpen] = useState(false);
  const [isError, setError] = useState(false);

  showToast = (msg: string | NestHttpException, err: boolean) => {
    setOpen(true);
    setMessage(msg);
    setError(err);
  };

  if (!message) {
    return null;
  }
  return (
    <Snackbar className={cx(classes.snackbar)} open={open} onClose={() => setOpen(false)} autoHideDuration={5000}>
      <SnackbarContent
        className={cx({
          [classes.error]: isError,
          [classes.success]: !isError,
        })}
        message={typeof message === 'string' ? message : message.message}
      />
    </Snackbar>
  );
};

export default Toast;
export const showMessage = (message: string | NestHttpException, isError: boolean = false) => {
  showToast(message, isError);
};
