import { gql } from '@apollo/client';

const ERRORS_502_ME_USER_QUERY = gql`
  query Errors502MeUserQuery {
    meUser {
      id
    }
  }
`;

export default ERRORS_502_ME_USER_QUERY;
