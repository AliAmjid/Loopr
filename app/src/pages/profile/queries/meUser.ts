import { gql } from '@apollo/client';

const PROFILE_USER_QUERY = gql`
  query ProfileUserQuery {
    meUser {
      id
      email
      firstname
      lastname
      role {
        id
        name
      }
    }
  }
`;

export default PROFILE_USER_QUERY;
