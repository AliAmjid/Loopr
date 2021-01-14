import { gql } from '@apollo/client';

const TEACHER_SUBJECTS_UPDATE_COLOR_SUBJECT_MUTATION = gql`
  mutation TeacherSubjectsUpdateColorSubjectMutation(
    $input: updateColorSubjectInput!
  ) {
    updateColorSubject(input: $input) {
      subject {
        id
      }
    }
  }
`;

export default TEACHER_SUBJECTS_UPDATE_COLOR_SUBJECT_MUTATION;
