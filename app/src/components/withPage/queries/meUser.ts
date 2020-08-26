import { gql } from 'apollo-boost';

const LOGGED_USER_QUERY = gql`
  query LoggedUserQuery {
    meUser {
      id
      name
    }
  }
`;

export default LOGGED_USER_QUERY;
