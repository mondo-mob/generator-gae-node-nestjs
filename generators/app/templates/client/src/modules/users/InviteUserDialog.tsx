import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import gql from 'graphql-tag';
import { without } from 'lodash';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import { Field } from 'react-final-form';
import Form from '../../components/Form';
import ChecklistField from '../../components/form/ChecklistField';
import Input from '../../components/form/TextField';
import { InviteUser, InviteUserVariables, UserRole } from '../../graphql';
import { compose, isEmail, minLength, required } from '../../util/validation';

interface State {
  open: boolean;
}

const mutation = gql`
  mutation InviteUser($email: String!, $roles: [String!]!) {
    inviteUser(email: $email, roles: $roles)
  }
`;

interface FormProps {
  email: string;
  roles: string[];
}

export class InviteUserDialog extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      open: false,
    };
  }

  public render() {
    return (
      <React.Fragment>
        <Button variant="contained" onClick={this.open}>
          Invite User
        </Button>
        <Dialog open={this.state.open} onClose={this.close} fullWidth>
          {this.open && (
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
                  onSuccess={this.close}
                >
                  {({ handleSubmit }) => (
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
                        <Button onClick={this.close}>Cancel</Button>
                        <Button color="primary" type="submit">
                          Invite
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
  }

  private open = () => this.setState({ open: true });
  private close = () => this.setState({ open: false });
}
