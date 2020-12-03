import { gql } from '@apollo/client';

const CLASS_GROUPS_USERS_QUERY = gql`
  query ClassGroupsUsersQuery(
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    users(first: $first, last: $last, after: $after, before: $before) {
      edges {
        node {
          id
          email
          firstname
          lastname
        }
        cursor
      }
      totalCount
    }
  }
`;

export default CLASS_GROUPS_USERS_QUERY;
