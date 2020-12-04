import { gql } from '@apollo/client';

const SUBJECTS_ADD_SUBJECT_GROUP_QUERY = gql`
  query SubjectsAddSubjectGroupQuery(
    $before: String
    $after: String
    $first: Int
    $last: Int
  ) {
    groups(before: $before, after: $after, first: $first, last: $last) {
      edges {
        node {
          id
          section
        }
        cursor
      }
      totalCount
    }
  }
`;

export default SUBJECTS_ADD_SUBJECT_GROUP_QUERY;
