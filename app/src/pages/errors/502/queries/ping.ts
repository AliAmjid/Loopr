import { gql } from '@apollo/client';

const ERRORS_502_PING_QUERY = gql`
  query Errors502PingQuery {
    ping
  }
`;

export default ERRORS_502_PING_QUERY;
