import { gql } from '@apollo/client';

const LOGIN_PASSWORD_RESET_RESET_PASSWORD_USER_MUTATION = gql`
  mutation LoginPasswordResetResetPasswordUserMutation(
    $key: String!
    $newPassword: String!
  ) {
    resetPasswordUser(key: $key, newPassword: $newPassword)
  }
`;

export default LOGIN_PASSWORD_RESET_RESET_PASSWORD_USER_MUTATION;
