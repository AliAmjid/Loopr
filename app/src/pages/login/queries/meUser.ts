import { gql } from 'apollo-boost';

const ALREADY_LOGGED_USER_QUERY = gql`
  query AlreadyLoggedUserQuery {
    meUser {
      id
      name
    }
  }
`;

export default ALREADY_LOGGED_USER_QUERY;
