import { gql } from '@apollo/client';

const CLASS_GROUPS_USERS_QUERY = gql`
  query ClassGroupsUsersQuery(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $resourceName: String
    $email: String
    $firstname: String
    $lastname: String
    $isInClassGroup: Boolean
    $classGroups: [String!]
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
      exists: { classGroup: $isInClassGroup }
      classGroup_id_list: $classGroups
    ) {
      edges {
        node {
          id
          email
          firstname
          lastname
          classGroup {
            id
            section
            year
          }
        }
        cursor
      }
      totalCount
    }
  }
`;

export default CLASS_GROUPS_USERS_QUERY;
