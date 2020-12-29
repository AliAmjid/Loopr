import { gql } from '@apollo/client';

const ACL_EDIT_ROLE_UPDATE_ROLE = gql`
  mutation AclEditRoleUpdateRole($id: ID!, $name: String) {
    updateAclRole(input: { id: $id, name: $name }) {
      aclRole {
        id
        name
      }
    }
  }
`;

export default ACL_EDIT_ROLE_UPDATE_ROLE;
