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
    $roles: [String!]
    $exists: [UserFilter_exists]
    $classGroups: [String!]
  ) {
    users(
      first: $first
      after: $after
      last: $last
      before: $before
      email: $email
      firstname: $firstName
      lastname: $lastName
      role_id_list: $roles
      exists: $exists
      classGroup_id_list: $classGroups
    ) {
      edges {
        node {
          id
          email
          firstname
          lastname
          createdAt
          archivedAt
          role {
            id
            name
          }
          classGroup {
            id
          }
        }
        cursor
      }
      totalCount
    }
  }
`;

export default USERS_USERS_QUERY;
