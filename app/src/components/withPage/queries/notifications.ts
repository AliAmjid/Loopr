import { gql } from '@apollo/client';

const WITH_PAGE_NOTIFICATIONS_QUERY = gql`
  query WithPageNotificationsQuery(
    $first: Int
    $last: Int
    $before: String
    $after: String
  ) {
    meUser {
      notifications(
        first: $first
        last: $last
        before: $before
        after: $after
      ) {
        edges {
          node {
            id
            type
            viewAt
            parameters
          }
          cursor
        }
        totalCount
      }
    }
  }
`;

export default WITH_PAGE_NOTIFICATIONS_QUERY;
