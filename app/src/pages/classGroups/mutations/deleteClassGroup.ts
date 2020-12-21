import { gql } from '@apollo/client';

const CLASS_GROUPS_DELETE_CLASS_GROUP_MUTATION = gql`
  mutation ClassGroupsDeleteClassGroupMutation($input: deleteClassGroupInput!) {
    deleteClassGroup(input: $input) {
      classGroup {
        id
      }
    }
  }
`;

export default CLASS_GROUPS_DELETE_CLASS_GROUP_MUTATION;
