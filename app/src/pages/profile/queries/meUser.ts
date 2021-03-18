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
      privateData {
        defaultPercentToMark {
          id
          one
          two
          three
          four
        }
      }
    }
  }
`;

export default PROFILE_USER_QUERY;
