import { gql } from '@apollo/client';

const SUBJECTS_SUBJECT_TYPES_QUERY = gql`
  query SubjectsSubjectTypesQuery {
    subjectTypes {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

export default SUBJECTS_SUBJECT_TYPES_QUERY;
