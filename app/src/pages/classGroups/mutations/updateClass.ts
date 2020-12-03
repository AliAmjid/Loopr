import { gql } from '@apollo/client';

const CLASS_GROUPS_UPDATE_CLASS_GROUP_MUTATION = gql`
  mutation ClassGroupsUpdateClassGroupMutation($input: updateClassGroupInput!) {
    updateClassGroup(input: $input) {
      classGroup {
        id
        year
        section
      }
    }
  }
`;

export default CLASS_GROUPS_UPDATE_CLASS_GROUP_MUTATION;
