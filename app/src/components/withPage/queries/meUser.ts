import { gql } from '@apollo/client';

const WITH_PAGE_ME_USER_QUERY = gql`
  query WithPageMeUserQuery {
    meUser {
      id
      firstname
      lastname
      role {
        name
      }
    }
  }
`;

export default WITH_PAGE_ME_USER_QUERY;
