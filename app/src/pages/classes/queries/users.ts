import { gql } from '@apollo/client';

const CLASSES_USERS_QUERY = gql`
  query ClassesUsersQuery(
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    users(first: $first, last: $last, after: $after, before: $before) {
      edges {
        node {
          id
          firstname
          lastname
        }
        cursor
      }
      totalCount
    }
  }
`;

export default CLASSES_USERS_QUERY;
