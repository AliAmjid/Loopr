import { gql } from '@apollo/client';

const USERS_USERS_QUERY = gql`
  query UsersUsersQuery(
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    users(first: $first, after: $after, last: $last, before: $before) {
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
