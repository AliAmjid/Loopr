import { gql } from '@apollo/client';

const CLASS_GROUPS_CLASS_GROUP_QUERY = gql`
  query ClassGroupsClassGroupQuery(
    $id: ID!
    $usersFirst: Int
    $usersLast: Int
    $usersAfter: String
    $usersBefore: String
  ) {
    classGroup(id: $id) {
      id
      users(
        first: $usersFirst
        last: $usersLast
        after: $usersAfter
        before: $usersBefore
      ) {
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
  }
`;

export default CLASS_GROUPS_CLASS_GROUP_QUERY;
