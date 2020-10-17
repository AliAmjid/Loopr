import { gql } from '@apollo/client';

const USERS_USER_DETAIL_UPDATE_USER_MUTATION = gql`
  mutation UsersUserDetailUpdateUserMutation($input: updateUserInput!) {
    updateUser(input: $input) {
      user {
        id
        name
        username
        role {
          id
          name
        }
      }
    }
  }
`;

export default USERS_USER_DETAIL_UPDATE_USER_MUTATION;
