import { gql } from '@apollo/client';

const SUBJECTS_ADD_SUBJECT_SUMMARY_CLASS_GROUP_QUERY = gql`
  query SubjectsAddSubjectSummaryClassGroupQuery(
    $classGroup: ID!
    $teacher: ID!
  ) {
    classGroup(id: $classGroup) {
      id
      year
      section
    }
    user(id: $teacher) {
      id
      firstname
      lastname
    }
  }
`;

export default SUBJECTS_ADD_SUBJECT_SUMMARY_CLASS_GROUP_QUERY;
