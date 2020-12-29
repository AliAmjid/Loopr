import { gql } from '@apollo/client';

const CLASS_GROUPS_UPDATE_USERS_CLASS_GROUP_MUTATION = gql`
  mutation ClassGroupsUpdateUsersClassGroupMutation(
    $input: updateUsersClassGroupInput!
  ) {
    updateUsersClassGroup(input: $input) {
      classGroup {
        id
      }
    }
  }
`;

export default CLASS_GROUPS_UPDATE_USERS_CLASS_GROUP_MUTATION;
