import { gql } from '@apollo/client';

const ACL_EDIT_ROLE_ACL_ROLE_QUERY = gql`
  query AclEditRoleAclRole($id: ID!) {
    aclRole(id: $id) {
      id
      name
    }
  }
`;

export default ACL_EDIT_ROLE_ACL_ROLE_QUERY;
