import { gql } from '@apollo/client';

const USER_IMPORT_TABLE_ACL_ROLES_QUERY = gql`
  query UserImportTableAclRolesQuery {
    aclRoles {
      id
      name
    }
  }
`;

export default USER_IMPORT_TABLE_ACL_ROLES_QUERY;
