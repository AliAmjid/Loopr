import { gql } from '@apollo/client';

const USERS_USERS_QUERY = gql`
  query UsersUsersQuery {
    users {
      edges {
        node {
          id
          firstname
          lastname
          email
          createdAt
          role {
            id
            name
          }
        }
        cursor
      }
    }
  }
`;

export default USERS_USERS_QUERY;
