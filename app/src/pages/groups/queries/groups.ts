import { gql } from '@apollo/client';

const GROUPS_GROUPS_QUERY = gql`
  query GroupsGroupsQuery {
    groups {
      edges {
        node {
          id
          section
        }
      }
    }
  }
`;

export default GROUPS_GROUPS_QUERY;
