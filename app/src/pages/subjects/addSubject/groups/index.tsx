import React from 'react';

import Tabs from 'components/Tabs';

import ClassGroupsIndex from './classGroups';
import GroupsTable from './groups';

const GroupsIndex: React.FC = () => {
  return (
    <Tabs
      variant="fullWidth"
      tabs={[
        { id: 0, label: 'Classes', panel: <ClassGroupsIndex /> },
        { id: 1, label: 'Groups', panel: <GroupsTable /> },
      ]}
    />
  );
};

export default GroupsIndex;
