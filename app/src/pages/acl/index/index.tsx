import React from 'react';

import withPage from 'components/withPage';

import Acl from './Acl';
import aclPageOptions from './pageOptions';

const AclIndex: React.FC = () => {
  return <Acl />;
};

export default withPage(aclPageOptions)(AclIndex);
