import { gql } from '@apollo/client';

const GROUPS_USERS_QUERY = gql`
  query GroupsUsersQuery(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $groupId: String!
    $resourceName: String
  ) {
    users(
      first: $first
      last: $last
      after: $after
      before: $before
      role_resources_name: $resourceName
    ) {
      edges {
        node {
          id
          firstname
          lastname
          groups(id: $groupId, first: 1) {
            edges {
              node {
                id
              }
            }
          }
        }
        cursor
      }
      totalCount
    }
  }
`;

export default GROUPS_USERS_QUERY;
