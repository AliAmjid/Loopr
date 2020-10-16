import { gql } from '@apollo/client';

const USERS_USER_DETAIL_USER_QUERY = gql`
  query UsersUserDetailUserQuery($id: ID!) {
    user(id: $id) {
      id
      name
      username
      role {
        id
        name
      }
    }
  }
`;

export default USERS_USER_DETAIL_USER_QUERY;
