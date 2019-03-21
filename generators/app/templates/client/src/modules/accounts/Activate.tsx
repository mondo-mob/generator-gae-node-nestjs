import { Button, StyleRulesCallback, Theme, withStyles, WithStyles } from '@material-ui/core';
import { ApolloClient } from 'apollo-client';
import * as React from 'react';
import { withApollo, WithApolloClient } from 'react-apollo';
import { Field } from 'react-final-form';
import { Link, RouteComponentProps } from 'react-router-dom';
import Form from '../../components/Form';
import Input from '../../components/form/TextField';
import { requestJSON } from '../../util/http';
import { required } from '../../util/validation';
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
});

interface Props extends WithStyles<typeof styles>, RouteComponentProps<{ code: string }>, WithApolloClient<{}> {}

const activate = (client: ApolloClient<void>, code: string, callback: any) => async ({
  name,
  password,
}: {
  name: string;
  password: string;
}) => {
  await requestJSON('/auth/activate', 'post', {
    name,
    password,
    code,
  });

  await client.reFetchObservableQueries();

  callback();
};

const ConfirmReset: React.FC<Props> = ({ classes, client, match, history }) => (
  <AccountPage
    title="Activate account"
    links={
      <React.Fragment>
        <Link to="/signin">Signing in?</Link>
      </React.Fragment>
    }
  >
    <Form onSubmit={activate(client, match.params.code, () => history.push('/'))}>
      {({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <Field
            label="Name"
            fullWidth
            name="name"
            margin="normal"
            validate={required('Name is required')}
            component={Input}
          />

          <Field
            label="Password"
            fullWidth
            name="password"
            type="password"
            margin="normal"
            validate={required('Password is required')}
            component={Input}
          />

          <Button type="submit" color="primary" variant="contained" className={classes.submit} disabled={submitting}>
            Activate account
          </Button>
        </form>
      )}
    </Form>
  </AccountPage>
);

export default withApollo(withStyles(styles)(ConfirmReset));
