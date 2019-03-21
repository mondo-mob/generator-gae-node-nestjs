import { Button, CircularProgress, Typography, WithStyles, withStyles } from '@material-ui/core';
import gql from 'graphql-tag';
import * as React from 'react';
import { Mutation, Query } from 'react-apollo';
import { Field } from 'react-final-form';
import { RouteComponentProps } from 'react-router';
import Form from '../../components/Form';
import { DropzoneField } from '../../components/form/DropzoneField';
import Input from '../../components/form/TextField';
import {
  AttachmentInput,
  UpdateUser,
  UpdateUserVariables,
  UserDetails,
  UserDetailsVariables,
  UserRole,
} from '../../graphql';
import { required } from '../../util/validation';

const userDetailsQuery = gql`
  query UserDetails($userId: ID!) {
    userById(id: $userId) {
      id
      name
      roles
      credentials {
        type
        username
      }
    }
  }
`;

const mutation = gql`
  mutation UpdateUser($userId: ID!, $name: String!, $roles: [UserRole!]!, $profile: [AttachmentInput!]) {
    updateUser(id: $userId, name: $name, roles: $roles, profile: $profile) {
      id
      name
      roles
      profile {
        id
        filename
      }
    }
  }
`;

interface RouteProps {
  userId: string;
}

interface FormProps {
  name: string;
  roles: UserRole[];
  profile?: AttachmentInput[];
}

const styles = {
  form: {
    display: 'block',
    maxWidth: 300,
  },
};

interface Props extends RouteComponentProps<RouteProps>, WithStyles<typeof styles> {}

const UpdateUserPage: React.FC<Props> = ({ match, history, classes }) => (
  <Query<UserDetails, UserDetailsVariables> query={userDetailsQuery} variables={{ userId: match.params.userId }}>
    {({ data, loading }) => {
      if (loading && (!data || !data.userById)) {
        return <CircularProgress />;
      }

      if (!data || !data.userById) {
        return 'User not found';
      }

      const user = data.userById;

      return (
        <React.Fragment>
          <Typography variant="title" paragraph>
            {user.name}
          </Typography>

          <Typography variant="headline">Login</Typography>

          <Typography variant="body1" paragraph>
            Type: {user.credentials && user.credentials.type} <br />
            Email: {user.credentials && user.credentials.username}
          </Typography>

          <Typography variant="headline">Update</Typography>
          <Mutation<UpdateUser, UpdateUserVariables> mutation={mutation}>
            {updateUser => (
              <Form<FormProps>
                onSubmit={({ name, roles, profile }) =>
                  updateUser({
                    variables: { userId: match.params.userId, name, roles, profile },
                  })
                }
                initialValues={{
                  name: user.name,
                  roles: user.roles.join(' '),
                }}
                successMessage="Updated user"
                onSuccess={() => history.push(`/users`)}
              >
                {({ handleSubmit }) => (
                  <form onSubmit={handleSubmit} className={classes.form}>
                    <Field
                      label="Name"
                      name="name"
                      margin="normal"
                      fullWidth
                      validate={required('Name is required')}
                      component={Input}
                    />

                    <Field
                      label="Name"
                      name="roles"
                      margin="normal"
                      fullWidth
                      validate={required('Name is required')}
                      component={Input}
                    />
                    <Field
                      infoText="Drag profile image(s) here, or click to select files to upload."
                      name="profile"
                      margin="normal"
                      component={DropzoneField as any}
                      multiple={true}
                      accept="image/jpg, image/jpeg, image/png"
                    />
                    <Button variant="contained" color="primary" type="submit">
                      Save changes
                    </Button>
                  </form>
                )}
              </Form>
            )}
          </Mutation>
        </React.Fragment>
      );
    }}
  </Query>
);

export default withStyles(styles)(UpdateUserPage as any);
