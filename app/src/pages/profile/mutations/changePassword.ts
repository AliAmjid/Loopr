import { gql } from '@apollo/client';

const PROFILE_CHANGE_PASSWORD = gql`
  mutation ProfileChangePassword($input: changePasswordUserInput!) {
    changePasswordUser(input: $input) {
      user {
        id
      }
    }
  }
`;

export default PROFILE_CHANGE_PASSWORD;
