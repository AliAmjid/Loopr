import { gql } from '@apollo/client';

const CLASS_GROUPS_CLASS_GROUP_USERS_QUERY = gql`
  query ClassGroupsClassGroupUsersQuery(
    $id: ID!
    $usersFirst: Int
    $usersLast: Int
    $usersAfter: String
    $usersBefore: String
    $email: String
    $firstname: String
    $lastname: String
  ) {
    classGroup(id: $id) {
      id
      users(
        first: $usersFirst
        last: $usersLast
        after: $usersAfter
        before: $usersBefore
        email: $email
        firstname: $firstname
        lastname: $lastname
      ) {
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
  }
`;

export default CLASS_GROUPS_CLASS_GROUP_USERS_QUERY;
