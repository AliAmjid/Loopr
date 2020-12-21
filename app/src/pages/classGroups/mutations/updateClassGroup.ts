import { gql } from '@apollo/client';

// TODO add fragment
const CLASS_GROUPS_UPDATE_CLASS_GROUP_MUTATION = gql`
  mutation ClassGroupsUpdateClassGroupMutation($input: updateClassGroupInput!) {
    updateClassGroup(input: $input) {
      classGroup {
        id
        year
        section
        teacher {
          id
          email
          firstname
          lastname
        }
      }
    }
  }
`;

export default CLASS_GROUPS_UPDATE_CLASS_GROUP_MUTATION;
