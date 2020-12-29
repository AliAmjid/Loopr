import { gql } from '@apollo/client';

const GROUPS_UPDATE_GROUP_MUTATION = gql`
  mutation GroupsUpdateGroupMutation($input: updateGroupInput!) {
    updateGroup(input: $input) {
      group {
        id
        section
      }
    }
  }
`;

export default GROUPS_UPDATE_GROUP_MUTATION;
