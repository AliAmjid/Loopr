import { gql } from '@apollo/client';

const ACL_EDIT_ROLE_DELETE_ACL_ROLE_MUTATION = gql`
  mutation AclEditRoleDeleteAclRoleMutation($input: deleteAclRoleInput!) {
    deleteAclRole(input: $input) {
      aclRole {
        id
      }
    }
  }
`;

export default ACL_EDIT_ROLE_DELETE_ACL_ROLE_MUTATION;
