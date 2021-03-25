import { useMutation, useQuery } from '@apollo/client';
import { Button, CircularProgress, FormControlLabel, makeStyles, Switch, Theme, Typography } from '@material-ui/core';
import gql from 'graphql-tag';
import { without } from 'lodash';
import * as React from 'react';
import { useContext } from 'react';
import { Field, FormRenderProps } from 'react-final-form';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import Actions from '../../components/common/layout/Actions';
import PageHeader from '../../components/common/layout/PageHeader';
import PaperSection from '../../components/common/layout/PaperSection';
import { UserContext } from '../../components/context/UserContext';
import Form from '../../components/Form';
import ChecklistField from '../../components/form/ChecklistField';
import Input from '../../components/form/TextField';
import {
  UpdateUser as IUpdateUser,
  UpdateUserVariables,
  UserDetails,
  UserDetailsVariables,
  UserRole,
} from '../../graphql';
import { listUsersRoute } from '../../routes/AdminRoutes';
import { minLength, required } from '../../util/validation';

const userDetailsQuery = gql`
  query UserDetails($userId: ID!) {
    userById(id: $userId) {
      id
      email
      name
      roles
      enabled
    }
  }
`;

const mutation = gql`
  mutation UpdateUser($userId: ID!, $name: String!, $roles: [String!]!) {
    updateUser(id: $userId, name: $name, roles: $roles) {
      id
      email
      name
      roles
      enabled
    }
  }
`;

interface RouteProps {
  userId: string;
}

interface FormProps {
  name: string;
  roles: UserRole[];
  enabled: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    maxWidth: 500,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  subtitle: {
    color: 'gray',
  },
  enabledContainer: {
    marginBottom: theme.spacing(4),
  },
}));

interface Props extends RouteComponentProps<RouteProps> {}

const UpdateUser: React.FC<Props> = ({ match, history }) => {
  const classes = useStyles();

  const { data, loading } = useQuery<UserDetails, UserDetailsVariables>(userDetailsQuery, {
    variables: { userId: match.params.userId },
  });
  const [updateUser] = useMutation<IUpdateUser, UpdateUserVariables>(mutation);
  const { currentUser } = useContext(UserContext);

  if (loading && (!data || !data.userById)) {
    return <CircularProgress />;
  }

  if (!data || !data.userById) {
    return <>User not found</>;
  }

  const user = data.userById;
  const displayName = user.name || user.email;

  return (
    <>
      <PageHeader title={displayName} breadcrumbElements={[{ text: 'Users', link: listUsersRoute }, displayName]} />

      <Form<FormProps>
        onSubmit={({ name, roles }) => {
          return updateUser({
            variables: {
              userId: match.params.userId,
              name,
              roles,
            },
          });
        }}
        initialValues={{
          name: user.name,
          roles: user.roles,
          enabled: user.enabled,
        }}
        successMessage="Updated user"
        onSuccess={() => history.push(`/users`)}
        render={({ handleSubmit, values }: FormRenderProps) => (
          <form onSubmit={handleSubmit} className={classes.form}>
            <PaperSection>
              <div className={classes.container}>
                <Typography variant="body1" paragraph component="div">
                  <label className="MuiFormLabel-root">Email</label>
                  <div>{user.email}</div>
                </Typography>
                <Field
                  label="Name"
                  name="name"
                  margin="normal"
                  fullWidth
                  validate={required('Name is required')}
                  component={Input}
                />

                <div>
                  <Field
                    label="Roles"
                    name="roles"
                    margin="normal"
                    options={without(Object.keys(UserRole), 'super')}
                    validate={minLength('At least one role must be selected', 1)}
                    component={ChecklistField}
                  />
                </div>

                <div className={classes.enabledContainer}>
                  <Field name="enabled" type="checkbox">
                    {props => {
                      return (
                        <FormControlLabel
                          control={
                            <Switch
                              disabled={currentUser!.id === user.id}
                              checked={!!props.input.value}
                              value={props.input.value}
                              onChange={props.input.onChange}
                            />
                          }
                          label="Active"
                        />
                      );
                    }}
                  </Field>
                  {!values.enabled && (
                    <Typography className={classes.subtitle} variant="subtitle1" gutterBottom>
                      *Note, saving the user as inactive will result in them not being able to login
                    </Typography>
                  )}
                </div>
              </div>
            </PaperSection>
            <Actions>
              <Button to={listUsersRoute} component={Link}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Update
              </Button>
            </Actions>
          </form>
        )}
      />
    </>
  );
};

export default UpdateUser;
