import { gql } from '@apollo/client';

const TEACHER_SUBJECTS_SUBJECT_POINT_SYSTEM_CREATE_OR_UPDATE_POINT_SYSTEM_MUTATION = gql`
  mutation TeacherSubjectsSubjectPointSystemCreateOrUpdatePointsSystemMutation(
    $pointSystemInput: createOrUpdatePointSystemInput!
    $examInput: updateExamInput!
  ) {
    createOrUpdatePointSystem(input: $pointSystemInput) {
      pointSystem {
        id
      }
    }
    updateExam(input: $examInput) {
      exam {
        id
      }
    }
  }
`;

export default TEACHER_SUBJECTS_SUBJECT_POINT_SYSTEM_CREATE_OR_UPDATE_POINT_SYSTEM_MUTATION;
