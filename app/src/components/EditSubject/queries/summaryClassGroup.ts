import { gql } from '@apollo/client';

const EDIT_SUBJECT_SUMMARY_CLASS_GROUP_QUERY = gql`
  query EditSubjectSummaryClassGroupQuery($classGroup: ID!, $teacher: ID!) {
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

export default EDIT_SUBJECT_SUMMARY_CLASS_GROUP_QUERY;
