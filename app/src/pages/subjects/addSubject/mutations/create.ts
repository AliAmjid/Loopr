import { gql } from '@apollo/client';

const SUBJECTS_ADD_SUBJECT_CREATE_SUBJECT_MUTATION = gql`
  mutation SubjectsAddSubjectCreateSubjectMutataion(
    $input: createSubjectInput!
  ) {
    createSubject(input: $input) {
      subject {
        id
      }
    }
  }
`;

export default SUBJECTS_ADD_SUBJECT_CREATE_SUBJECT_MUTATION;
