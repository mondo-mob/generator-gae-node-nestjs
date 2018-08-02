import { Theme, withStyles, WithStyles } from '@material-ui/core';
import * as React from 'react';
import PageTitle from './PageTitle';
import Sidebar from './Sidebar';

const styles = (theme: Theme) => ({
  root: {
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'row' as 'row',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
});

interface Props extends WithStyles<typeof styles> {}

interface State {
  open: boolean;
}

class Page extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  public render() {
    const { classes, children } = this.props;

    const { open } = this.state;

    return (
      <div>
        <PageTitle open={open} handleDrawerOpen={this.open} />
        <main className={classes.root}>
          <Sidebar open={open} handleDrawerClose={this.close} />
          <div className={classes.content}>
            <div className={classes.toolbar} />
            <div>{children}</div>
          </div>
        </main>
      </div>
    );
  }

  private close = () => this.setState({ open: false });
  private open = () => this.setState({ open: true });
}

export default withStyles(styles)(Page);
