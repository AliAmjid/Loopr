import { gql } from '@apollo/client';

const LOGIN_ME_USER_QUERY = gql`
  query LoginMeUserQuery {
    meUser {
      id
      firstname
      lastname
    }
  }
`;

export default LOGIN_ME_USER_QUERY;
