import { gql } from '@apollo/client';

const CLASSES_CLASS_QUERY = gql`
  query ClassesClassQuery(
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

export default CLASSES_CLASS_QUERY;
