import { gql } from '@apollo/client';

const CLASS_GROUPS_ARCHIVE_CLASS_GROUP_MUTATION = gql`
  mutation ClassGroupsArchiveClassGroupMutation(
    $input: archiveClassGroupInput!
  ) {
    archiveClassGroup(input: $input) {
      classGroup {
        id
      }
    }
  }
`;

export default CLASS_GROUPS_ARCHIVE_CLASS_GROUP_MUTATION;
