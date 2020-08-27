import { gql } from 'apollo-boost';

const LOGIN_GET_TOKEN_QUERY = gql`
  query LoginGetTokenQuery($username: String!, $password: String!) {
    getToken(username: $username, password: $password) {
      token
    }
  }
`;

export default LOGIN_GET_TOKEN_QUERY;
