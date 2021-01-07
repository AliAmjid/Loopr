import { gql } from '@apollo/client';

const STUDENT_SUBJECTS_LEARNED_SUBJECTS_QUERY = gql`
  query StudentSubjectsLearnedSubjectsQuery {
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
          exams {
            edges {
              node {
                id
                name
                pointSystem {
                  id
                  maxPoints
                  points {
                    edges {
                      node {
                        examWritten
                        id
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
    }
  }
`;

export default STUDENT_SUBJECTS_LEARNED_SUBJECTS_QUERY;
