import { gql } from '@apollo/client';

const TEACHER_SUBJECTS_SUBJECTS_QUERY = gql`
  {
    meUser {
      taughtSubjects {
        edges {
          node {
            group {
              id
            }
            classGroup {
              id
            }
          }
        }
      }
    }
  }
`;

export default TEACHER_SUBJECTS_SUBJECTS_QUERY;
