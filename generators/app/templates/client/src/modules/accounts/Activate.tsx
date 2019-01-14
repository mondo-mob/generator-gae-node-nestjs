import { Button, Theme, withStyles, WithStyles } from '@material-ui/core';
import gql from 'graphql-tag';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import { Field } from 'react-final-form';
import { Link, RouteComponentProps } from 'react-router-dom';
import Form from '../../components/Form';
import Input from '../../components/form/TextField';
import { ActivateAccount, ActivateAccountVariables } from '../../graphql';
import { required } from '../../util/validation';
import AccountPage from './AccountPage';

const styles = (theme: Theme) => ({
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

const mutation = gql`
  mutation ActivateAccount($name: String!, $password: String!, $code: String!) {
    activateAccount(code: $code, name: $name, password: $password)
  }
`;

interface Props
  extends WithStyles<typeof styles>,
    RouteComponentProps<{ code: string }> {}

interface FormData {
  name: string;
  password: string;
}

const ConfirmReset: React.SFC<Props> = ({ classes, match, history }) => (
  <AccountPage
    title="Activate account"
    links={
      <React.Fragment>
        <Link to="/signin">Signing in?</Link>
      </React.Fragment>
    }
  >
    <Mutation<ActivateAccount, ActivateAccountVariables> mutation={mutation}>
      {activateAccount => (
        <Form<FormData>
          onSubmit={({ name, password }) =>
            activateAccount({
              variables: { name, password, code: match.params.code },
            })
          }
          successMessage="Activated account"
          onSuccess={() => history.push(`/sigin`)}
        >
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
    </Mutation>
  </AccountPage>
);

export default withStyles(styles)(ConfirmReset);
