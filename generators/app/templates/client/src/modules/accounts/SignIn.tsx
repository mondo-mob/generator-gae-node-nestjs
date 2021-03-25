import { ApolloClient, useApolloClient } from '@apollo/client';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { useEffect } from 'react';
import { Field, FormRenderProps } from 'react-final-form';
import { Link, useHistory, useLocation } from 'react-router-dom';
import google from '../../assets/google.svg';
import Form from '../../components/Form';
import Input from '../../components/form/TextField';
import { showMessage } from '../../components/Toast';
import { requestJSON } from '../../util/http';
import { asArray } from '../../util/util';
import AccountPage from './AccountPage';

const useStyles = makeStyles(theme => ({
  submit: {
    width: '100%',
    marginTop: theme.spacing(4),
  },
  google: {
    width: '100%',
    marginTop: theme.spacing(4),
    background: theme.palette.common.white,
  },
  googleButton: {
    display: 'flex',
    alignItems: 'center',
    '& img': {
      marginRight: theme.spacing(1),
      height: 18,
    },
  },
}));

const logIn = (client: ApolloClient<object>) => async ({
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

const SignIn = () => {
  const { search } = useLocation();
  const error = new URLSearchParams(search).get('error');
  const history = useHistory();
  const classes = useStyles();
  const client = useApolloClient();

  useEffect(() => {
    if (error) {
      const msg = asArray(error);
      showMessage(msg.join(' '), true);
      history.replace('/signing');
    }
  }, [error, history]);

  return (
    <AccountPage
      title="Sign In"
      links={
        <>
          <Link to="/reset">Forgot password?</Link>
        </>
      }
    >
      <Form
        onSubmit={logIn(client)}
        render={({ handleSubmit, submitting }: FormRenderProps) => (
          <form onSubmit={handleSubmit}>
            <Field label="Email" fullWidth name="username" margin="normal" component={Input} />

            <Field
              label="Password"
              fullWidth
              type="password"
              name="password"
              margin="normal"
              component={Input}
              autoComplete="current-password"
            />

            <Button type="submit" color="primary" variant="contained" className={classes.submit} disabled={submitting}>
              Sign in
            </Button>

            <Button variant="contained" href="/auth/signin/google" className={classes.google}>
              <div className={classes.googleButton}>
                <img src={google} alt="" />
                <span>Sign in with google</span>
              </div>
            </Button>
          </form>
        )}
      />
    </AccountPage>
  );
};

export default SignIn;
