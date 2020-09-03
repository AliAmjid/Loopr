import React from 'react';

import EditRole from 'pages/acl/editRole/editRole';
import editRolePageOptions from 'pages/acl/editRole/pageOptions';

import withPage from 'components/withPage';

const EditRoleIndex: React.FC = () => {
  return <EditRole />;
};

export default withPage(editRolePageOptions)(EditRoleIndex);
