import { gql } from '@apollo/client';

const SUBJECTS_DELETE_SUBJECT_MUTATION = gql`
  mutation SubjectsDeleteSubjectMutation($input: deleteSubjectInput!) {
    deleteSubject(input: $input) {
      subject {
        id
      }
    }
  }
`;

export default SUBJECTS_DELETE_SUBJECT_MUTATION;
