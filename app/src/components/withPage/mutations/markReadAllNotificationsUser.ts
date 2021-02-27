import { gql } from '@apollo/client';

const WITH_PAGE_MARK_READ_ALL_NOTIFICATION_USER_MUTATION = gql`
  mutation WithPageMarkReadAllNotificationUserMutation(
    $input: markReadAllNotificationsUserInput!
  ) {
    markReadAllNotificationsUser(input: $input) {
      user {
        id
      }
    }
  }
`;

export default WITH_PAGE_MARK_READ_ALL_NOTIFICATION_USER_MUTATION;
