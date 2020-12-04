import { gql } from '@apollo/client';

const SUBJECTS_ADD_SUBJECT_CLASS_GROUPS_QUERY = gql`
  query SubjectsAddSubjectClassGroupsQuery(
    $before: String
    $after: String
    $first: Int
    $last: Int
  ) {
    classGroups(before: $before, after: $after, first: $first, last: $last) {
      edges {
        node {
          id
          section
          year
          teacher {
            id
            firstname
            lastname
          }
        }
        cursor
      }
      totalCount
    }
  }
`;

export default SUBJECTS_ADD_SUBJECT_CLASS_GROUPS_QUERY;
