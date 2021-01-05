import { gql } from '@apollo/client';

const TEACHER_SUBJECTS_SUBJECT_POINT_SYSTEM_CREATE_EXAM_MUTATION = gql`
  mutation TeacherSubejctsSubjectPointSystemCreateExamMutation(
    $input: createExamInput!
  ) {
    createExam(input: $input) {
      exam {
        id
      }
    }
  }
`;

export default TEACHER_SUBJECTS_SUBJECT_POINT_SYSTEM_CREATE_EXAM_MUTATION;
