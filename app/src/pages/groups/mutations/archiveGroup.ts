import { gql } from '@apollo/client';

const GROUPS_ARCHIVE_GROUP_MUTATION = gql`
  mutation GroupsArchiveGroupMutation($input: archiveGroupInput!) {
    archiveGroup(input: $input) {
      group {
        id
      }
    }
  }
`;

export default GROUPS_ARCHIVE_GROUP_MUTATION;
