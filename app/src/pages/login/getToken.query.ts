import { gql } from 'apollo-boost';

const getTokenQuery = gql`
  query($username: String!, $password: String!) {
    getToken(username: $username, password: $password) {
      token
    }
  }
`;

export interface GetTokenQueryVars {
  username: string;
  password: string;
}

export interface GetTokenQuery {
  getToken: {
    token: string;
  };
}

export default getTokenQuery;
