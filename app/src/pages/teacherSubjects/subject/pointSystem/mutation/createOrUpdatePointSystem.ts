import { gql } from '@apollo/client';

const TEACHER_SUBJECTS_SUBJECT_POINT_SYSTEM_CREATE_OR_UPDATE_POINT_SYSTEM_MUTATION = gql`
  mutation TeacherSubjectsSubjectPointSystemCreateOrUpdatePointsSystemMutation(
    $input: createOrUpdatePointSystemInput!
  ) {
    createOrUpdatePointSystem(input: $input) {
      pointSystem {
        id
      }
    }
  }
`;

export default TEACHER_SUBJECTS_SUBJECT_POINT_SYSTEM_CREATE_OR_UPDATE_POINT_SYSTEM_MUTATION;
