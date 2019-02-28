import { StyleRulesCallback, Theme, withStyles, WithStyles } from '@material-ui/core';
import * as React from 'react';
import { RouteHelper } from '../../routes/route-helper';
import PageTitle from '../PageTitle';
import AdminSidebar from './AdminSidebar';

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
  anyRoles: string[];
}

interface State {
  open: boolean;
}

class AdminLayout extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  public render() {
    const { classes, children, r, anyRoles } = this.props;

    const { open } = this.state;

    if (!r.hasAnyRole(...anyRoles)) {
      return r.defaultElement();
    }

    return (
      <div>
        <PageTitle open={open} handleDrawerOpen={this.open} showDrawer={true} r={r} />
        <main className={classes.root}>
          <AdminSidebar r={r} open={open} handleDrawerClose={this.close} />
          <div className={classes.content}>
            <div className={classes.toolbar} />
            <div className={classes.childrenContent}>{children}</div>
          </div>
        </main>
      </div>
    );
  }

  private close = () => this.setState({ open: false });
  private open = () => this.setState({ open: true });
}

export default withStyles(styles)(AdminLayout);