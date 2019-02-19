import { StyleRulesCallback, Theme, withStyles, WithStyles } from '@material-ui/core';
import * as React from 'react';
import { RouteHelper } from '../../routes/route-helper';
import PageTitle from '../PageTitle';

const styles: StyleRulesCallback = (theme: Theme) => ({
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

interface Props extends WithStyles<typeof styles> {
  r: RouteHelper;
}

interface State {
  open: boolean;
}

class PublicLayout extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  public render() {
    const { classes, children, r } = this.props;

    const { open } = this.state;

    return (
      <div>
        <PageTitle open={open} handleDrawerOpen={this.open} showDrawer={false} r={r} />
        <main className={classes.root}>
          <div className={classes.content}>
            <div className={classes.toolbar} />
            <div className={classes.childrenContent}>{children}</div>
          </div>
        </main>
      </div>
    );
  }

  private open = () => this.setState({ open: true });
}

export default withStyles(styles)(PublicLayout);
