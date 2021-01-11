import { gql } from '@apollo/client';

const STUDENT_SUBJECTS_LEARNED_SUBJECTS_QUERY = gql`
  query StudentSubjectsLearnedSubjectsQuery($schoolPeriods: [String!]) {
    learnedSubjects {
      edges {
        node {
          id
          percentsToMarkConvert {
            id
            one
            two
            three
            four
          }
          subjectType {
            id
            name
          }
          evaluationSystem
          exams(schoolPeriod_id_list: $schoolPeriods) {
            edges {
              node {
                id
                name
                pointSystem {
                  id
                  maxPoints
                  average
                  points {
                    edges {
                      node {
                        examWritten
                        id
                        points
                        percentil
                        worstThan
                        user {
                          id
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    schoolPeriods {
      edges {
        node {
          id
          schoolYear
          quarter
        }
      }
    }
    meUser {
      id
    }
  }
`;

export default STUDENT_SUBJECTS_LEARNED_SUBJECTS_QUERY;
