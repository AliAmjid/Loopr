import { gql } from '@apollo/client';

const TEACHER_SUBJECTS_SUBJECT_POINT_SYSTEM = gql`
  query TeacherSubjectsSubjectPointSystem($id: ID!) {
    subject(id: $id) {
      id
    }
  }
`;

export default TEACHER_SUBJECTS_SUBJECT_POINT_SYSTEM;
