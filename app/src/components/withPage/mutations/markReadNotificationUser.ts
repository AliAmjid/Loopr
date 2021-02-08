import { gql } from '@apollo/client';

const WITH_PAGE_MARK_READ_NOTIFICATIONS_USER_MUTATION = gql`
  mutation WithPageMarkReadNotificationsUserMutation(
    $input: markReadNotificationUserInput!
  ) {
    markReadNotificationUser(input: $input) {
      user {
        id
      }
    }
  }
`;

export default WITH_PAGE_MARK_READ_NOTIFICATIONS_USER_MUTATION;
