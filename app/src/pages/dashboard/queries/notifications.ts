import { gql } from '@apollo/client';

const DASHBOARD_NOTIFICATIONS_QUERY = gql`
  query DashboardNotificationsQuery($first: Int!) {
    meUser {
      notifications(first: $first) {
        edges {
          node {
            id
            viewAt
            parameters
            type
          }
        }
      }
    }
  }
`;

export default DASHBOARD_NOTIFICATIONS_QUERY;
