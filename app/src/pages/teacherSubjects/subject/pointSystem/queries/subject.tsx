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
  query TeacherSubjectsSubjectPointSystemSubjectQuery(
    $id: ID!
    $schoolPeriods: [String!]
  ) {
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
      exams(schoolPeriod_id_list: $schoolPeriods) {
        edges {
          node {
            id
            name
            writtenAt
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
    schoolPeriods(order: { schoolYear: "DESC", quarter: "DESC" }) {
      edges {
        node {
          id
          schoolYear
          quarter
        }
      }
    }
    getCurrentHalfYearSchoolPeriods {
      id
    }
  }
`;

export default TEACHER_SUBJECTS_SUBJECT_POINT_SYSTEM_SUBJECT_QUERY;
