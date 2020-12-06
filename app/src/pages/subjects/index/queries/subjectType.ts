import { gql } from '@apollo/client';

const SUBJECTS_SUBJECT_TYPE_QUERY = gql`
  query SubjectsSubjectTypeQuery(
    $id: ID!
    $subjectsFirst: Int
    $subjectsLast: Int
    $subjectsAfter: String
    $subjectsBefore: String
  ) {
    subjectType(id: $id) {
      id
      subjects(
        first: $subjectsFirst
        last: $subjectsLast
        after: $subjectsAfter
        before: $subjectsBefore
      ) {
        edges {
          node {
            id
            group {
              id
              section
            }
            classGroup {
              id
              year
              section
            }
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
  }
`;

export default SUBJECTS_SUBJECT_TYPE_QUERY;
