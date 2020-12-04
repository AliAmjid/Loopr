import React from 'react';

import MaterialTable from 'lib/material-table';

import { GroupTableProps } from './types';

const GroupTable: React.FC<GroupTableProps> = () => {
  return (
    <MaterialTable
      uniqueName="pages/subjects/addSubject/groups/groupTable"
      columns={[]}
      data={[]}
    />
  );
};

export default GroupTable;
