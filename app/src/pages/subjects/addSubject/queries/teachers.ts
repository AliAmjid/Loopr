import { gql } from '@apollo/client';

const SUBJECTS_ADD_SUBJECT_TEACHER_QUERY = gql`
  query SubjectsAddSubjectTeacherQuery(
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

export default SUBJECTS_ADD_SUBJECT_TEACHER_QUERY;
