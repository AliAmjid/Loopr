import { gql } from '@apollo/client';

const USERS_USER_DETAIL_ARCHIVE_USER_MUTATION = gql`
  mutation UsersUserDetailArchiveUserMutation($input: archiveUserInput!) {
    archiveUser(input: $input) {
      user {
        id
      }
    }
  }
`;

export default USERS_USER_DETAIL_ARCHIVE_USER_MUTATION;
