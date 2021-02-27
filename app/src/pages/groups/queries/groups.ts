import { gql } from '@apollo/client';

const GROUPS_GROUPS_QUERY = gql`
  query GroupsGroupsQuery($section: String, $exists: [GroupFilter_exists]) {
    groups(section: $section, exists: $exists) {
      edges {
        node {
          id
          section
          archivedAt
        }
      }
    }
  }
`;

export default GROUPS_GROUPS_QUERY;
