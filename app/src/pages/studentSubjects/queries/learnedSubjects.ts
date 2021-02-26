import { gql } from '@apollo/client';

const STUDENT_SUBJECTS_LEARNED_SUBJECTS_QUERY = gql`
  query StudentSubjectsLearnedSubjectsQuery($schoolPeriodsIterable: Iterable) {
    learnedSubjects(hasUserExamInSchoolPeriod: $schoolPeriodsIterable) {
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
          exams {
            edges {
              node {
                id
                name
                writtenAt
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
          _id
          schoolYear
          quarter
        }
      }
    }
    getCurrentSchoolPeriod {
      _id
      quarter
      schoolYear
    }
    meUser {
      id
    }
  }
`;

export default STUDENT_SUBJECTS_LEARNED_SUBJECTS_QUERY;
