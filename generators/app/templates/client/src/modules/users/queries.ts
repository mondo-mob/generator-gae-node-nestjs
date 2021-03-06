import gql from 'graphql-tag';

export const listUsersQuery = gql`
  query ListUsers {
    users {
      id
      name
      email
      enabled
      roles
    }
  }
`;

export const meQuery = gql`
  query Me {
    me {
      id
      name
      roles
      enabled
    }
  }
`;
