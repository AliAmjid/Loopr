import { gql } from '@apollo/client';

const SUBJECTS_EDIT_SUBJECT_SUMMARY_GROUP_QUERY = gql`
  query SubjectsEditSubjectSummaryGroupQuery($group: ID!, $teacher: ID!) {
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

export default SUBJECTS_EDIT_SUBJECT_SUMMARY_GROUP_QUERY;
