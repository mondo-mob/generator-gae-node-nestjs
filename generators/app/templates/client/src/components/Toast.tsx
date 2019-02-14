import {
  Snackbar,
  SnackbarContent,
  StyleRulesCallback,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import cx from 'classnames';
import * as React from 'react';

interface State {
  message?: string;
  isOpen: boolean;
  autoHide?: boolean;
  isError?: boolean;
}

let showToast: (message: string, isError: boolean) => void = (
  message: string,
  isError: boolean,
) => {
  // do nothing by default
};

const styles: StyleRulesCallback = (theme: Theme) => ({
  snackbar: {
    marginBottom: theme.spacing.unit * 2,
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

  public showToast = (message: string, isError: boolean) => {
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

    return (
      <Snackbar
        className={cx(classes.snackbar)}
        open={isOpen}
        onClose={this.close}
        autoHideDuration={autoHide ? 5000 : undefined}
      >
        {message && (
          <SnackbarContent
            className={cx({
              [classes.error]: isError,
              [classes.success]: !isError,
            })}
            message={message}
          />
        )}
      </Snackbar>
    );
  }

  private close = () => {
    this.setState({
      isOpen: false,
    });
  };
}

export default withStyles(styles)(Toast);
export const showMessage = (message: string, isError: boolean = false) => {
  showToast(message, isError);
};
