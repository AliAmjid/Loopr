import { gql } from 'apollo-boost';

const WITH_PAGE_ME_USER_QUERY = gql`
  query WithPageMeUserQuery {
    meUser {
      id
      name
    }
  }
`;

export default WITH_PAGE_ME_USER_QUERY;
