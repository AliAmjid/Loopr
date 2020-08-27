import React from 'react';

import { useQuery } from '@apollo/client';

import { AclTableQuery } from 'types/graphql';

import withPage from 'components/withPage';

import ACL_TABLE_QUERY from './queries/aclTable';
import Acl from './Acl';
import aclPageOptions from './pageOptions';

const AclIndex: React.FC = () => {
  const { data } = useQuery<AclTableQuery>(ACL_TABLE_QUERY);
  console.log(data);

  return <Acl />;
};

export default withPage(aclPageOptions)(AclIndex);
