import { gql } from '@apollo/client';

const SUBJECTS_EDIT_SUBJECT_UPDATE_SUBJECT_MUTATION = gql`
  mutation SubjectsEditSubjectUpdateSubjectMutation(
    $input: updateSubjectInput!
  ) {
    updateSubject(input: $input) {
      subject {
        id
      }
    }
  }
`;

export default SUBJECTS_EDIT_SUBJECT_UPDATE_SUBJECT_MUTATION;
