import { gql } from '@apollo/client';

const TEACHER_SUBJECTS_SUBJECT_POINT_SYSTEM_SUBJECT_QUERY = gql`
  fragment TeacherSubjectsSubjectPointSystemSubectUserFragment on UserConnection {
    edges {
      node {
        id
        firstname
        lastname
      }
    }
  }
  query TeacherSubjectsSubjectPointSystemSubjectQuery($id: ID!) {
    subject(id: $id) {
      id
      group {
        users {
          ...TeacherSubjectsSubjectPointSystemSubectUserFragment
        }
      }
      classGroup {
        users {
          ...TeacherSubjectsSubjectPointSystemSubectUserFragment
        }
      }
      exams {
        edges {
          node {
            id
            name
            pointSystem {
              points {
                edges {
                  node {
                    user {
                      id
                    }
                    points
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default TEACHER_SUBJECTS_SUBJECT_POINT_SYSTEM_SUBJECT_QUERY;
