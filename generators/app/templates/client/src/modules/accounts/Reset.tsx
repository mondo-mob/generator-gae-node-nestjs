import { Button, Theme, withStyles, WithStyles } from '@material-ui/core';
import gql from 'graphql-tag';
import * as React from 'react';
import { Mutation, withApollo, WithApolloClient } from 'react-apollo';
import { Field } from 'react-final-form';
import { Link } from 'react-router-dom';
import Form from '../../components/Form';
import Input from '../../components/form/TextField';
import { ResetPassword, ResetPasswordVariables } from '../../graphql';
import { required } from '../../util/validation';
import AccountPage from './AccountPage';

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
});

const resetPassword = gql`
  mutation ResetPassword($email: String!) {
    resetPassword(email: $email)
  }
`;

interface Props extends WithStyles<typeof styles>, WithApolloClient<{}> {}

const SignIn: React.FC<Props> = ({ classes }) => (
  <AccountPage
    title="Reset password"
    links={
      <React.Fragment>
        <Link to="/signin">Signing in?</Link>
      </React.Fragment>
    }
  >
    <Mutation<ResetPassword, ResetPasswordVariables> mutation={resetPassword}>
      {mutation => (
        <Form<{ email: string }>
          onSubmit={variables => mutation({ variables })}
          successMessage="Password reset email has been sent"
        >
          {({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit}>
              <Field
                label="Email"
                fullWidth
                name="email"
                margin="normal"
                validate={required('Email address is required')}
                component={Input}
              />

              <Button
                type="submit"
                color="primary"
                variant="contained"
                className={classes.submit}
                disabled={submitting}
              >
                Reset password
              </Button>
            </form>
          )}
        </Form>
      )}
    </Mutation>
  </AccountPage>
);

export default withApollo(withStyles(styles)(SignIn));
