import * as React from 'react';
import ProgressBar from './ProgressBar';

interface State {
  loading: number;
  visible: boolean;
}

let loading = 0;
let start = () => {
  /* Do nothing */
};
let finish = () => {
  /* Do nothing */
};

export class DelayLoading extends React.PureComponent<{}, State> {
  private timeout: number | null;

  public constructor(props: {}) {
    super(props);

    this.timeout = null;
    this.state = {
      loading: 0,
      visible: false,
    };

    start = () => {
      this.setState({
        loading: ++loading,
      });
    };

    finish = () => {
      this.setState({
        loading: --loading,
      });
    };
  }

  public componentDidUpdate() {
    if (this.state.loading > 0 && !this.timeout) {
      this.timeout = setTimeout(() => {
        this.setState({
          visible: true,
        });
        this.timeout = null;
      }, 500) as any;
    } else if (this.state.loading === 0) {
      if (this.state.visible) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          visible: false,
        });
      }

      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
    }
  }

  public componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  public render() {
    return <ProgressBar isLoading={this.state.visible} />;
  }
}

export const startLoading = () => {
  start();
};

export const finishLoading = () => {
  finish();
};
