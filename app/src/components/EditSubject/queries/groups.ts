import { gql } from '@apollo/client';

const EDIT_SUBJECT_GROUP_QUERY = gql`
  query EditSubjectGroupQuery(
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

export default EDIT_SUBJECT_GROUP_QUERY;
