import { gql } from '@apollo/client';

const SUBJECTS_ADD_SUBJECT_GROUP = gql`
  query SubjectsAddSubjectGroup {
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

export default SUBJECTS_ADD_SUBJECT_GROUP;
