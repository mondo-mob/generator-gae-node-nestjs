import { useMutation } from '@apollo/client';
import { withApollo, WithApolloClient } from '@apollo/client/react/hoc';
import { Button, makeStyles, Theme } from '@material-ui/core';
import gql from 'graphql-tag';
import * as React from 'react';
import { Field, FormRenderProps } from 'react-final-form';
import { Link } from 'react-router-dom';
import Form from '../../components/Form';
import Input from '../../components/form/TextField';
import { ResetPassword, ResetPasswordVariables } from '../../graphql';
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

const resetPasswordMutation = gql`
  mutation ResetPassword($email: String!) {
    resetPassword(email: $email)
  }
`;

interface Props extends WithApolloClient<{}> {}

const Reset: React.FC<Props> = () => {
  const classes = useStyles();
  const [resetPassword] = useMutation<ResetPassword, ResetPasswordVariables>(resetPasswordMutation);
  return (
    <AccountPage
      title="Reset password"
      links={
        <>
          <Link to="/signin">Signing in?</Link>
        </>
      }
    >
      <Form<{ email: string }>
        onSubmit={variables => resetPassword({ variables })}
        successMessage="Password reset email has been sent"
        render={({ handleSubmit, submitting }: FormRenderProps) => (
          <form onSubmit={handleSubmit}>
            <Field
              label="Email"
              fullWidth
              name="email"
              margin="normal"
              validate={required('Email address is required')}
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

export default withApollo<Props>(Reset);
