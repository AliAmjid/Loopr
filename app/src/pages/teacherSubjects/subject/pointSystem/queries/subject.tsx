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
      subjectType {
        id
        name
      }
      group {
        section
        users {
          ...TeacherSubjectsSubjectPointSystemSubectUserFragment
        }
      }
      classGroup {
        section
        year
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
              maxPoints
              points {
                edges {
                  node {
                    user {
                      id
                    }
                    points
                    examWritten
                  }
                }
              }
            }
          }
        }
      }
      percentsToMarkConvert {
        id
        one
        two
        three
        four
      }
    }
  }
`;

export default TEACHER_SUBJECTS_SUBJECT_POINT_SYSTEM_SUBJECT_QUERY;
