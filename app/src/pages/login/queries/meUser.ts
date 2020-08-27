import { gql } from '@apollo/client';

const LOGIN_ME_USER_QUERY = gql`
  query LoginMeUserQuery {
    meUser {
      id
      name
    }
  }
`;

export default LOGIN_ME_USER_QUERY;
