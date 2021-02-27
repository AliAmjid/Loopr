import { gql } from '@apollo/client';

const DASHBOARD_WRITTEN_EXAMS_QUERY = gql`
  query DashboardWrittenExamsQuery($first: Int!) {
    meUser {
      id
    }
    writtenExams(first: $first, order: { writtenAt: "DESC" }) {
      edges {
        node {
          name
          writtenAt
          pointSystem {
            maxPoints
            points {
              edges {
                node {
                  points
                  examWritten
                  user {
                    id
                  }
                }
              }
            }
          }
          subject {
            evaluationSystem
            percentsToMarkConvert {
              one
              two
              three
              four
            }
            subjectType {
              id
              name
            }
          }
        }
      }
    }
  }
`;

export default DASHBOARD_WRITTEN_EXAMS_QUERY;
