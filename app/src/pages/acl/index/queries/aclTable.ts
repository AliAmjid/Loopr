import { gql } from '@apollo/client';

const ACL_TABLE_QUERY = gql`
  query AclTableQuery {
    aclResources {
      id
      name
    }
    aclRoles {
      id
      name
      resources {
        id
      }
    }
  }
`;

export default ACL_TABLE_QUERY;
