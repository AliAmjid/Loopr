import { gql } from '@apollo/client';

const WITH_PAGE_ME_USER_QUERY = gql`
  query WithPageMeUserQuery {
    meUser {
      id
      firstname
      lastname
      role {
        id
        name
        resources {
          id
          name
        }
      }
    }
  }
`;

export default WITH_PAGE_ME_USER_QUERY;
