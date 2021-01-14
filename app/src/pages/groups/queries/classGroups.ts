import { gql } from '@apollo/client';

const GROUPS_CLASS_GROUPS_QUERY = gql`
  query GroupsClassGroupsQuery {
    classGroups {
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

export default GROUPS_CLASS_GROUPS_QUERY;
