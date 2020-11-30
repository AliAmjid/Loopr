import { gql } from '@apollo/client';

const GROUPS_UPDATE_GROUP_INFO_MUTATION = gql`
  mutation GroupsUpdateGroupInfoMutation($input: updateGroupInput!) {
    updateGroup(input: $input) {
      group {
        id
        year
        section
      }
    }
  }
`;

export default GROUPS_UPDATE_GROUP_INFO_MUTATION;
