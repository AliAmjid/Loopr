import { gql } from '@apollo/client';

const LOGIN_PASSWORD_RESET_REQUEST_APPLY_PASSWORD_RESET_USER_MUTATION = gql`
  mutation LoginPasswordResetRequestApplyPasswordResetUsetMutation(
    $email: String!
  ) {
    applyPasswordResetUser(email: $email)
  }
`;

export default LOGIN_PASSWORD_RESET_REQUEST_APPLY_PASSWORD_RESET_USER_MUTATION;
