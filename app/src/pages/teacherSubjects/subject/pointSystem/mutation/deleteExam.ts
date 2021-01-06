import { gql } from '@apollo/client';

const TEACHER_SUBJECTS_SUBJECT_POINTS_SYSTEM_DELETE_EXAM_MUTATION = gql`
  mutation TeacherSubjectsSubjectPointsSystemDeleteExamMutation(
    $input: deleteExamInput!
  ) {
    deleteExam(input: $input) {
      exam {
        id
      }
    }
  }
`;

export default TEACHER_SUBJECTS_SUBJECT_POINTS_SYSTEM_DELETE_EXAM_MUTATION;
