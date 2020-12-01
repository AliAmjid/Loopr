import { gql } from '@apollo/client';

const GROUPS_GROUP_QUERY = gql`
  query GroupsGroupQuery(
    $id: ID!
    $usersFirst: Int
    $usersLast: Int
    $usersAfter: String
    $usersBefore: String
  ) {
    group(id: $id) {
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

export default GROUPS_GROUP_QUERY;
