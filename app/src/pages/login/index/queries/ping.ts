import { gql } from '@apollo/client';

const LOGIN_PING_QUERY = gql`
  query LoginPingQuery {
    ping
  }
`;

export default LOGIN_PING_QUERY;
