import { gql } from '@apollo/client';

const SUBJECTS_EDIT_SUBJECT_SUBJECT_QUERY = gql`
  query SubjectsEditSubjectSubjectQuery($id: ID!) {
    subject(id: $id) {
      id
      group {
        id
      }
      classGroup {
        id
      }
      teacher {
        id
      }
    }
  }
`;

export default SUBJECTS_EDIT_SUBJECT_SUBJECT_QUERY;
