import { gql } from '@apollo/client';

const EDIT_SUBJECT_GROUP_QUERY = gql`
  query EditSubjectGroupQuery(
    $before: String
    $after: String
    $first: Int
    $last: Int
    $section: String
  ) {
    groups(
      before: $before
      after: $after
      first: $first
      last: $last
      section: $section
    ) {
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
