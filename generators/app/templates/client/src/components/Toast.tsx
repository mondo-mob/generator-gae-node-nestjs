import { Snackbar, SnackbarContent, Theme, withStyles, WithStyles } from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import cx from 'classnames';
import * as React from 'react';

interface NestHttpException {
  statusCode: number;
  error: string;
  message: string;
}

interface State {
  message?: string | NestHttpException;
  isOpen: boolean;
  autoHide?: boolean;
  isError?: boolean;
}

let showToast: (message: string | NestHttpException, isError: boolean) => void = (
  message: string | NestHttpException,
  isError: boolean,
) => {
  // do nothing by default
};

const styles = (theme: Theme) => ({
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
});

class Toast extends React.PureComponent<WithStyles<typeof styles>, State> {
  public constructor(props: WithStyles<typeof styles>) {
    super(props);
    showToast = this.showToast;

    this.state = {
      isOpen: false,
    };
  }

  public showToast = (message: string | NestHttpException, isError: boolean) => {
    this.setState({
      isOpen: true,
      message,
      isError,
      autoHide: true,
    });
  };

  public render() {
    const { classes } = this.props;

    const { isError, isOpen, message, autoHide } = this.state;
    if (!message) {
      return null;
    }
    return (
      <Snackbar
        className={cx(classes.snackbar)}
        open={isOpen}
        onClose={this.close}
        autoHideDuration={autoHide ? 5000 : undefined}
      >
        <SnackbarContent
          className={cx({
            [classes.error]: isError,
            [classes.success]: !isError,
          })}
          message={this.getMessageText(message)}
        />
      </Snackbar>
    );
  }

  private getMessageText(message: string | NestHttpException): string {
    if (typeof message === 'string') {
      return message;
    }
    return message.message;
  }

  private close = () => {
    this.setState({
      isOpen: false,
    });
  };
}

export default withStyles(styles)(Toast);
export const showMessage = (message: string | NestHttpException, isError: boolean = false) => {
  showToast(message, isError);
};
