import { gql } from '@apollo/client';

const GROUPS_USERS_QUERY = gql`
  query GroupsUsersQuery(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $groupId: String!
    $resourceName: String
    $email: String
    $firstname: String
    $lastname: String
    $classGroups: [String]
  ) {
    users(
      first: $first
      last: $last
      after: $after
      before: $before
      role_resources_name: $resourceName
      email: $email
      firstname: $firstname
      lastname: $lastname
      classGroup_id_list: $classGroups
    ) {
      edges {
        node {
          id
          firstname
          lastname
          classGroup {
            id
            year
            section
          }
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
