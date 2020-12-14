import { gql } from '@apollo/client';

const SUBJECTS_EDIT_SUBJECT_TEACHER_QUERY = gql`
  query SubjectsEditSubjectTeacherQuery(
    $before: String
    $after: String
    $first: Int
    $last: Int
    $resourceName: String
  ) {
    users(
      before: $before
      after: $after
      first: $first
      last: $last
      role_resources_name: $resourceName
    ) {
      edges {
        node {
          id
          email
          firstname
          lastname
        }
        cursor
      }
      totalCount
    }
  }
`;

export default SUBJECTS_EDIT_SUBJECT_TEACHER_QUERY;
