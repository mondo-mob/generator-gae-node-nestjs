import gql from 'graphql-tag';

export const listUsersQuery = gql`
  query ListUsers {
    users {
      id
      name
      email
      avatar {
        url
      }
      roles
    }
  }
`;

export const getUserForInvite = gql`
  query GetUserForInvite($code: String!) {
    userForInvite(code: $code) {
      id
      name
      email
    }
  }
`;

export const meQuery = gql`
  query Me {
    me {
      id
      name
      roles
    }
  }
`;
