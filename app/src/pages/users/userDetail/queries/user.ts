import { gql } from '@apollo/client';

const USERS_USER_DETAIL_USER_QUERY = gql`
  query UsersUserDetailUserQuery($id: ID!) {
    user(id: $id) {
      id
      email
      firstname
      lastname
      createdAt
      role {
        id
        name
      }
    }
    aclRoles {
      id
      name
    }
  }
`;

export default USERS_USER_DETAIL_USER_QUERY;
