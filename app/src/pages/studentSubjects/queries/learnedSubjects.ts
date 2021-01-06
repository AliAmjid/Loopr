import { gql } from '@apollo/client';

const STUDENT_SUBJECTS_LEARNED_SUBJECTS_QUERY = gql`
  query StudentSubjectsLearnedSubjectsQuery {
    learndSubjects {
      edges {
        node {
          id
          subjectType {
            id
            name
          }
          evaluationSystem
          exams {
            edges {
              node {
                id
                pointSystem {
                  id
                  maxPoints
                  points {
                    edges {
                      node {
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
