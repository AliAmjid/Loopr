import { gql } from '@apollo/client';

const GROUPS_DELETE_MUTATION = gql`
  mutation GroupsDeleteMutation($input: deleteGroupInput!) {
    deleteGroup(input: $input) {
      group {
        id
      }
    }
  }
`;

export default GROUPS_DELETE_MUTATION;
