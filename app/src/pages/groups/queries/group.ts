import { gql } from '@apollo/client';

const GROUPS_GROUP_QUERY = gql`
  query GroupsGroupQuery(
    $id: ID!
    $usersFirst: Int
    $usersLast: Int
    $usersAfter: String
    $usersBefore: String
    $email: String
    $firstname: String
    $lastname: String
  ) {
    group(id: $id) {
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

export default GROUPS_GROUP_QUERY;
