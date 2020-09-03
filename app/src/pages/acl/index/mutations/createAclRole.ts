import {
  ApolloCache,
  FetchResult,
  gql,
  MutationUpdaterFn,
} from '@apollo/client';

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

export const aclCreateAclRoleUpdate: MutationUpdaterFn<AclCreateAclRole> = (
  cache: ApolloCache<AclCreateAclRole>,
  { data }: FetchResult<AclCreateAclRole>,
) => {
  const createAclRole = data?.createAclRole;
  if (!createAclRole) return;
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  createAclRole.__typename = 'AclRoleCollection';
  cache.modify({
    fields: {
      aclRoles(existingRoles: any[] = []) {
        const newTodoRef = cache.writeFragment({
          data: createAclRole,
          fragment: gql`
            fragment NewRole on AclRoleCollection {
              id
              name
              resources {
                id
              }
            }
          `,
        });

        return [...existingRoles, newTodoRef];
      },
    },
  });
};

export default ACL_CREATE_ACL_ROLE;
