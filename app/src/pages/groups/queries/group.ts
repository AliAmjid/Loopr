import { gql } from '@apollo/client';

const GROUPS_GROUP_QUERY = gql`
  query GroupsGroupQuery($id: ID!) {
    group(id: $id) {
      id
      users {
        edges {
          node {
            id
            firstname
            lastname
          }
        }
      }
    }
  }
`;

export default GROUPS_GROUP_QUERY;
