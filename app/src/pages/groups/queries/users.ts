import { gql } from '@apollo/client';

const GROUPS_USERS_QUERY = gql`
  query GroupsUsersQuery(
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

export default GROUPS_USERS_QUERY;
