import { gql } from '@apollo/client';

const USERS_USERS_QUERY = gql`
  query UsersUsersQuery(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $email: String
    $firstName: String
    $lastName: String
  ) {
    users(
      first: $first
      after: $after
      last: $last
      before: $before
      email: $email
      firstname: $firstName
      lastname: $lastName
    ) {
      edges {
        node {
          id
          email
          firstname
          lastname
          createdAt
          role {
            id
            name
          }
        }
        cursor
      }
      totalCount
    }
  }
`;

export default USERS_USERS_QUERY;
