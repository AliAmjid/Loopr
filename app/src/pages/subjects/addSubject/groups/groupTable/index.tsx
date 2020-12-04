import React from 'react';

import { Query } from 'material-table';

import MaterialTable from 'lib/material-table';

import { Group, GroupTableProps } from '../types';

const GroupTable: React.FC<GroupTableProps> = props => {
  return (
    <MaterialTable
      uniqueName="pages/subjects/addSubject/groups/groupTable"
      columns={[{ title: 'Name', field: 'section' }]}
      data={(query: Query<Group>) =>
        props.onGetGroups(query).then(res => ({
          page: query.page,
          data: res.groups,
          totalCount: res.totalCount,
        }))
      }
    />
  );
};

export default GroupTable;
