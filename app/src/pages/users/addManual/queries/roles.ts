import { gql } from '@apollo/client';

const USERS_ADD_MANUAL_ACL_ROLES_QUERY = gql`
  query UsersAddManualAclRolesQuery {
    aclRoles {
      id
      name
    }
  }
`;

export default USERS_ADD_MANUAL_ACL_ROLES_QUERY;
