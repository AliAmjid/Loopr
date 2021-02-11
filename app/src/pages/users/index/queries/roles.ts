import { gql } from '@apollo/client';

const USERS_ROLES_QUERY = gql`
  query UsersRolesQuery {
    aclRoles {
      id
      name
    }
  }
`;

export default USERS_ROLES_QUERY;
