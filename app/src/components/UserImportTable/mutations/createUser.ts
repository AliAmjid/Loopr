import { gql } from '@apollo/client';

const USER_IMPORT_TABLE_CREATE_USER_MUTATION = gql`
  mutation UserImportTableCreateUserMutation($input: createUserInput!) {
    createUser(input: $input) {
      user {
        id
      }
    }
  }
`;

export default USER_IMPORT_TABLE_CREATE_USER_MUTATION;
