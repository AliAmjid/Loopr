import { gql } from '@apollo/client';

const GROUPS_ADD_GROUP_MUTATION = gql`
  mutation GroupsAddGroupMutation($input: createGroupInput!) {
    createGroup(input: $input) {
      group {
        id
      }
    }
  }
`;

export default GROUPS_ADD_GROUP_MUTATION;
