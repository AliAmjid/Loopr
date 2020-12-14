import { gql } from '@apollo/client';

const SUBJECTS_EDIT_SUBJECT_GROUP_QUERY = gql`
  query SubjectsEditSubjectGroupQuery(
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

export default SUBJECTS_EDIT_SUBJECT_GROUP_QUERY;
