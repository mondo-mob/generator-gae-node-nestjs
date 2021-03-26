import { ApolloClient, useApolloClient, useQuery } from '@apollo/client';
import { Button, makeStyles, Theme } from '@material-ui/core';
import gql from 'graphql-tag';
import * as React from 'react';
import { Field, FormRenderProps } from 'react-final-form';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Form from '../../components/Form';
import Input from '../../components/form/TextField';
import { showMessage } from '../../components/Toast';
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

const useStyles = makeStyles((theme: Theme) => ({
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
}));

const activate = (client: ApolloClient<object>, code: string, callback: any) => async ({
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
  showMessage('Your account has been activated. Please sign in.');
  callback();
};

const Activate = () => {
  const classes = useStyles();
  const history = useHistory();
  const { code } = useParams<{ code: string }>();
  const client = useApolloClient();

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
        <Form
          onSubmit={activate(client, code, () => history.push('/signin'))}
          render={({ handleSubmit, submitting }: FormRenderProps) => (
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
        />
      )}
    </AccountPage>
  );
};

export default Activate;
