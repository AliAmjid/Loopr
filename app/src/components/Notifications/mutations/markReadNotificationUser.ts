import { gql } from '@apollo/client';

const NOTIFICATIONS_MARK_READ_NOTIFICATIONS_USER_MUTATION = gql`
  mutation NotificationsMarkReadNotificationsUserMutation(
    $input: markReadNotificationUserInput!
  ) {
    markReadNotificationUser(input: $input) {
      user {
        id
        notifications {
          edges {
            node {
              id
              viewAt
            }
          }
        }
      }
    }
  }
`;

export default NOTIFICATIONS_MARK_READ_NOTIFICATIONS_USER_MUTATION;
