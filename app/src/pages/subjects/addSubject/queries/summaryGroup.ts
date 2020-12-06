import { gql } from '@apollo/client';

const SUBJECTS_ADD_SUBJECT_SUMMARY_GROUP_QUERY = gql`
  query SubjectsAddSubjectSummaryGroupQuery($group: ID!, $teacher: ID!) {
    group(id: $group) {
      id
      section
    }
    user(id: $teacher) {
      id
      firstname
      lastname
    }
  }
`;

export default SUBJECTS_ADD_SUBJECT_SUMMARY_GROUP_QUERY;
