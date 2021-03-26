import { useMutation } from '@apollo/client';
import { Button, makeStyles, Theme } from '@material-ui/core';
import gql from 'graphql-tag';
import * as React from 'react';
import { Field, FormRenderProps } from 'react-final-form';
import { useParams } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
import Form from '../../components/Form';
import Input from '../../components/form/TextField';
import { ConfirmResetPassword, ConfirmResetPasswordVariables } from '../../graphql';
import { required } from '../../util/validation';
import AccountPage from './AccountPage';

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
}));

const confirmResetPasswordMutation = gql`
  mutation ConfirmResetPassword($password: String!, $code: String!) {
    confirmResetPassword(newPassword: $password, code: $code)
  }
`;

interface FormData {
  password: string;
  confirmPassword: string;
}

const validatePasswordConfirmation = (value: string, allValues: any) =>
  value !== allValues.password ? 'Password confirmation must match' : undefined;

const ConfirmReset = () => {
  const classes = useStyles();
  const [confirmResetPassword] = useMutation<ConfirmResetPassword, ConfirmResetPasswordVariables>(
    confirmResetPasswordMutation,
  );
  const { code } = useParams<{ code: string }>();
  const history = useHistory();

  return (
    <AccountPage
      title="Reset password"
      links={
        <>
          <Link to="/signin">Signing in?</Link>
        </>
      }
    >
      <Form<FormData>
        onSubmit={({ password }) => confirmResetPassword({ variables: { password, code } })}
        successMessage="Password successfully reset"
        onSuccess={() => history.push(`/sigin`)}
        render={({ handleSubmit, submitting }: FormRenderProps) => (
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

            <Button type="submit" color="primary" variant="contained" className={classes.submit} disabled={submitting}>
              Reset password
            </Button>
          </form>
        )}
      />
    </AccountPage>
  );
};

export default ConfirmReset;
