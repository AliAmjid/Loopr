import { gql } from '@apollo/client';

const GROUPS_UPDATE_USERS_GROUP_MUTATION = gql`
  mutation GroupsUpdateUsersGroupMutation($input: updateUsersGroupInput!) {
    updateUsersGroup(input: $input) {
      group {
        id
      }
    }
  }
`;

export default GROUPS_UPDATE_USERS_GROUP_MUTATION;
