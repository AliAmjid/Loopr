import { ApolloCache, gql, MutationUpdaterFn } from '@apollo/client';

import { AclCreateAclRole } from 'types/graphql';

const ACL_CREATE_ACL_ROLE = gql`
  mutation AclCreateAclRole($input: createAclRoleInput!) {
    createAclRole(input: $input) {
      aclRole {
        id
        name
        resources {
          id
        }
      }
    }
  }
`;

export default ACL_CREATE_ACL_ROLE;
