import { gql } from '@apollo/client';

const LOGIN_GET_TOKEN_QUERY = gql`
  query LoginGetTokenQuery($email: String!, $password: String!) {
    getToken(email: $email, password: $password) {
      token
    }
  }
`;

export default LOGIN_GET_TOKEN_QUERY;
