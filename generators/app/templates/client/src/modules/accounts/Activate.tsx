import { Button, Theme, withStyles, WithStyles } from '@material-ui/core';
import { ApolloClient } from 'apollo-client';
import gql from 'graphql-tag';
import * as React from 'react';
import { withApollo, WithApolloClient } from 'react-apollo';
import { useQuery } from 'react-apollo-hooks';
import { Field } from 'react-final-form';
import { Link, RouteComponentProps } from 'react-router-dom';
import Form from '../../components/Form';
import Input from '../../components/form/TextField';
import { CheckActivationCode, CheckActivationCodeVariables } from '../../graphql';
import { requestJSON } from '../../util/http';
import { required } from '../../util/validation';
import Loading from '../pages/Loading';
import AccountPage from './AccountPage';

const checkActivationCodeQuery = gql`
  query CheckActivationCode($code: String!) {
    checkActivationCode(code: $code)
  }
`;

const styles = (theme: Theme) => ({
  submit: {
    width: '100%',
    marginTop: theme.spacing(4),
  },
  google: {
    width: '100%',
    marginTop: theme.spacing(4),
    background: theme.palette.common.white,
  },
  errorMessage: {
    marginTop: theme.spacing(6),
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

const ConfirmReset: React.FC<Props> = ({ classes, client, match, history }) => {
  const { code } = match.params;

  const { data, loading } = useQuery<CheckActivationCode, CheckActivationCodeVariables>(checkActivationCodeQuery, {
    variables: {
      code,
    },
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <AccountPage
      title="Activate account"
      links={
        <React.Fragment>
          <Link to="/signin">Signing in?</Link>
        </React.Fragment>
      }
    >
      {data!.checkActivationCode && <div className={classes.errorMessage}>{data!.checkActivationCode}</div>}
      {!data!.checkActivationCode && (
        <Form onSubmit={activate(client, code, () => history.push('/'))}>
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

              <Button
                type="submit"
                color="primary"
                variant="contained"
                className={classes.submit}
                disabled={submitting}
              >
                Activate account
              </Button>
            </form>
          )}
        </Form>
      )}
    </AccountPage>
  );
};

export default withApollo(withStyles(styles)(ConfirmReset));
