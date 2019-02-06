import { Button, StyleRulesCallback, Theme, withStyles, WithStyles } from '@material-ui/core';
import gql from 'graphql-tag';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import { Field } from 'react-final-form';
import { Link, RouteComponentProps } from 'react-router-dom';
import Form from '../../components/Form';
import Input from '../../components/form/TextField';
import {
  ConfirmResetPassword,
  ConfirmResetPasswordVariables,
} from '../../graphql';
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

const resetPassword = gql`
  mutation ConfirmResetPassword($password: String!, $code: String!) {
    confirmResetPassword(newPassword: $password, code: $code)
  }
`;

interface Props
  extends WithStyles<typeof styles>,
    RouteComponentProps<{ code: string }> {}

interface FormData {
  password: string;
  confirmPassword: string;
}

const validatePasswordConfirmation = (value: string, allValues: FormData) =>
  value !== allValues.password ? 'Password confirmation must match' : undefined;

const ConfirmReset: React.SFC<Props> = ({ classes, match, history }) => (
  <AccountPage
    title="Reset password"
    links={
      <React.Fragment>
        <Link to="/signin">Signing in?</Link>
      </React.Fragment>
    }
  >
    <Mutation<ConfirmResetPassword, ConfirmResetPasswordVariables>
      mutation={resetPassword}
    >
      {mutation => (
        <Form<FormData>
          onSubmit={({ password }) =>
            mutation({ variables: { password, code: match.params.code } })
          }
          successMessage="Password successfully reset"
          onSuccess={() => history.push(`/sigin`)}
        >
          {({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit}>
              <Field
                label="New password"
                fullWidth
                name="password"
                type="password"
                margin="normal"
                validate={required('Password is required')}
                component={Input}
              />

              <Field
                label="Confirm new password"
                fullWidth
                name="confirm_password"
                type="password"
                margin="normal"
                validate={validatePasswordConfirmation}
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

export default withStyles(styles)(ConfirmReset);
