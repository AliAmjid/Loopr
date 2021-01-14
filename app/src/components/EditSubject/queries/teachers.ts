import { gql } from '@apollo/client';

const EDIT_SUBJECT_TEACHER_QUERY = gql`
  query EditSubjectTeacherQuery(
    $before: String
    $after: String
    $first: Int
    $last: Int
    $resourceName: String
    $email: String
    $firstname: String
    $lastname: String
  ) {
    users(
      before: $before
      after: $after
      first: $first
      last: $last
      role_resources_name: $resourceName
      email: $email
      firstname: $firstname
      lastname: $lastname
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

export default EDIT_SUBJECT_TEACHER_QUERY;
