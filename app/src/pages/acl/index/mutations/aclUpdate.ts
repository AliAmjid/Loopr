import { gql } from '@apollo/client';

const ACL_UPDATE_ACL = gql`
  mutation AclUpdateAcl($id: ID!, $resources: [String!]!) {
    updateAclRole(input: { id: $id, resources: $resources }) {
      aclRole {
        id
        resources {
          id
        }
      }
    }
  }
`;

export default ACL_UPDATE_ACL;