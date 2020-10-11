import { gql } from '@apollo/client';

const USERS_ADD_MANUAL_CREATE_USER_MUTATION = gql`
  mutation UsersAddManualCreateUserMutation($input: createUserInput!) {
    createUser(input: $input) {
      user {
        id
      }
    }
  }
`;

export default USERS_ADD_MANUAL_CREATE_USER_MUTATION;
