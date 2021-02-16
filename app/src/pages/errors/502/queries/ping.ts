import { gql } from '@apollo/client';

const ERRORS_502_PING_QUERY = gql`
  query Errors502PingQuery {
    meUser {
      id
    }
  }
`;

export default ERRORS_502_PING_QUERY;
