// tslint:disable:no-console

import { Button, StyleRulesCallback, Theme, withStyles, WithStyles } from '@material-ui/core';
import { ApolloClient } from 'apollo-client';
import { isArray } from 'lodash';
import * as qs from 'query-string';
import * as React from 'react';
import { withApollo, WithApolloClient } from 'react-apollo';
import { Field } from 'react-final-form';
import { Link, RouteComponentProps } from 'react-router-dom';
import google from '../../assets/google.svg';
import Form from '../../components/Form';
import Input from '../../components/form/TextField';
import { showMessage } from '../../components/Toast';
import { requestJSON } from '../../util/http';
import AccountPage from './AccountPage';

const styles: StyleRulesCallback = (theme: Theme) => ({
  submit: {
    width: '100%',
    marginTop: theme.spacing.unit * 4,
  },
  google: {
    width: '100%',
    marginTop: theme.spacing.unit * 4,
    background: theme.palette.common.white,
  },
  googleButton: {
    display: 'flex',
    alignItems: 'center',
    '& img': {
      marginRight: theme.spacing.unit,
      height: 18,
    },
  },
});

const logIn = (client: ApolloClient<void>) => async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  await requestJSON('/auth/signin/local', 'post', {
    username,
    password,
  });

  await client.reFetchObservableQueries();
};

interface Props extends WithStyles<typeof styles>, RouteComponentProps<{}>, WithApolloClient<{}> {}

interface State {
  error?: string | string[];
}

class SignIn extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { error } = qs.parse(this.props.location.search);

    this.state = {
      error,
    };
  }

  public componentDidMount() {
    if (this.state.error) {
      const msg = isArray(this.state.error) ? this.state.error : [this.state.error];
      showMessage(msg.join(' '), true);
      this.props.history.replace(`/signin`);
    }
  }

  public render() {
    const { classes, client } = this.props;

    return (
      <AccountPage
        title="Sign In"
        links={
          <React.Fragment>
            <Link to="/reset">Forgot password?</Link>
          </React.Fragment>
        }
      >
        <Form onSubmit={logIn(client)}>
          {({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit}>
              <Field label="Email" fullWidth name="username" margin="normal" component={Input} />

              <Field label="Password" fullWidth type="password" name="password" margin="normal" component={Input} />

              <Button
                type="submit"
                color="primary"
                variant="contained"
                className={classes.submit}
                disabled={submitting}
              >
                Sign in
              </Button>

              <Button variant="contained" component="a" href="/auth/signin/google" className={classes.google}>
                <div className={classes.googleButton}>
                  <img src={google} alt="" />
                  <span>Sign in with google</span>
                </div>
              </Button>
            </form>
          )}
        </Form>
      </AccountPage>
    );
  }
}

export default withApollo(withStyles(styles)(SignIn));
