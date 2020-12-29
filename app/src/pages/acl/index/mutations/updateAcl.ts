import { gql } from '@apollo/client';

const ACL_UPDATE_ACL_MUTATION = gql`
  mutation AclUpdateAclMutation($input: updateAclRoleInput!) {
    updateAclRole(input: $input) {
      aclRole {
        id
        resources {
          id
        }
      }
    }
  }
`;

export default ACL_UPDATE_ACL_MUTATION;
