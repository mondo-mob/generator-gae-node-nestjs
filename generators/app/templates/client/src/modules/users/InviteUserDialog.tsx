import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import gql from 'graphql-tag';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import { Field } from 'react-final-form';
import Form from '../../components/Form';
import Input from '../../components/form/TextField';
import { InviteUser, InviteUserVariables } from '../../graphql';
import { required } from '../../util/validation';

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
  roles?: string;
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
        <Button variant="raised" onClick={this.open}>
          Invite User
        </Button>
        <Dialog open={this.state.open} onClose={this.close} fullWidth>
          {this.open && (
            <Mutation<InviteUser, InviteUserVariables> mutation={mutation}>
              {inviteUser => (
                <Form<FormProps>
                  onSubmit={({ email, roles }) =>
                    inviteUser({
                      variables: { email, roles: this.parseRoles(roles) },
                    })
                  }
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
                          validate={required('Email address is required')}
                          component={Input}
                        />

                        <Field
                          label="Roles"
                          fullWidth
                          name="roles"
                          margin="normal"
                          component={Input}
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
  private parseRoles = (roles: string | undefined) =>
    (roles || '').split(' ').filter(value => value);
}
