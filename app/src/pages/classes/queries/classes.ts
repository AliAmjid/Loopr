import { gql } from '@apollo/client';

const CLASSES_CLASSES_QUERY = gql`
  query ClassesClassesQuery {
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

export default CLASSES_CLASSES_QUERY;
