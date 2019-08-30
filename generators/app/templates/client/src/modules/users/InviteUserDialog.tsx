import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import gql from 'graphql-tag';
import { without } from 'lodash';
import { useState } from 'react';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import { Field } from 'react-final-form';
import Form from '../../components/Form';
import ChecklistField from '../../components/form/ChecklistField';
import Input from '../../components/form/TextField';
import { InviteUser, InviteUserVariables, UserRole } from '../../graphql';
import { compose, isEmail, minLength, required } from '../../util/validation';

const mutation = gql`
  mutation InviteUser($email: String!, $roles: [String!]!) {
    inviteUser(email: $email, roles: $roles)
  }
`;

interface FormProps {
  email: string;
  roles: string[];
}

const InviteUserDialog = () => {
  const [open, updateOpen] = useState(false);
  return (
    <React.Fragment>
      <Button variant="contained" onClick={() => updateOpen(true)}>
        Invite User
      </Button>
      <Dialog open={open} onClose={() => updateOpen(false)} fullWidth>
        {open && (
          <Mutation<InviteUser, InviteUserVariables> mutation={mutation} refetchQueries={['ListUsers']}>
            {inviteUser => (
              <Form<FormProps>
                onSubmit={({ email, roles }) =>
                  inviteUser({
                    variables: { email, roles },
                  })
                }
                initialValues={{ roles: [] }}
                successMessage="Invited user"
                onSuccess={() => updateOpen(false)}
              >
                {({ handleSubmit, submitting }) => (
                  <form onSubmit={handleSubmit}>
                    <DialogTitle>Invite user</DialogTitle>
                    <DialogContent>
                      <Field
                        label="Email"
                        fullWidth
                        name="email"
                        margin="normal"
                        validate={compose(
                          required('Email address is required'),
                          isEmail('Must be a valid email address'),
                        )}
                        component={Input}
                      />

                      <Field
                        label="Roles"
                        fullWidth
                        name="roles"
                        margin="normal"
                        options={without(Object.keys(UserRole), 'super')}
                        validate={minLength('At least one role must be selected', 1)}
                        component={ChecklistField}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => updateOpen(false)}>Cancel</Button>
                      <Button color="primary" type="submit" disabled={submitting}>
                        {submitting ? <CircularProgress size={15} /> : 'Invite'}
                      </Button>
                    </DialogActions>
                  </form>
                )}
              </Form>
            )}
          </Mutation>
        )}
      </Dialog>
    </React.Fragment>
  );
};

export default InviteUserDialog;
