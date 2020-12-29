import { gql } from '@apollo/client';

const CLASS_GROUPS_ADD_CLASS_GROUP_MUTATION = gql`
  mutation ClassGroupsAddClassGroupMutation($input: createClassGroupInput!) {
    createClassGroup(input: $input) {
      classGroup {
        id
      }
    }
  }
`;

export default CLASS_GROUPS_ADD_CLASS_GROUP_MUTATION;
