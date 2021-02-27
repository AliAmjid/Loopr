import { gql } from '@apollo/client';

const CLASS_GROUPS_CLASS_GROUPS_QUERY = gql`
  query ClassGroupsClassGroupsQuery($exists: [ClassGroupFilter_exists]) {
    classGroups(exists: $exists) {
      edges {
        node {
          id
          year
          section
        }
      }
    }
  }
`;

export default CLASS_GROUPS_CLASS_GROUPS_QUERY;
