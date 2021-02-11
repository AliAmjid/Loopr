import { gql } from '@apollo/client';

const DASHBOARD_WRITTEN_EXAMS_QUERY = gql`
  query DashboardWrittenExamsQuery($first: Int!) {
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
                  user {
                    id
                  }
                  points
                }
              }
            }
          }
          subject {
            evaluationSystem
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
