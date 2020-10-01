import { gql } from '@apollo/client';

const USERS_ADD_CSV_CREATE_USER = gql`
  mutation UsersAddCsvCreateUserMutation($input: createUserInput!) {
    createUser(input: $input) {
      user {
        id
      }
    }
  }
`;

export default USERS_ADD_CSV_CREATE_USER;
