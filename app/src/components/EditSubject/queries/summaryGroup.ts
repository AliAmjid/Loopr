import { gql } from '@apollo/client';

const EDIT_SUBJECT_SUMMARY_GROUP_QUERY = gql`
  query EditSubjectSummaryGroupQuery($group: ID!, $teacher: ID!) {
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

export default EDIT_SUBJECT_SUMMARY_GROUP_QUERY;
