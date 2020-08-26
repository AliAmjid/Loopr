import { gql } from 'apollo-boost';

const GET_TOKEN_QUERY = gql`
  query GetTokenQuery($username: String!, $password: String!) {
    getToken(username: $username, password: $password) {
      token
    }
  }
`;

export default GET_TOKEN_QUERY;
