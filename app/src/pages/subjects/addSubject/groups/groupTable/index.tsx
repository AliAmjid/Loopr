import React from 'react';

import AddIcon from '@material-ui/icons/Add';
import { Column, Query } from 'material-table';

import MaterialTable from 'lib/material-table';

import { Group, GroupTableProps } from '../types';

const GroupTable: React.FC<GroupTableProps> = props => {
  const columns: Column<Group>[] = [{ title: 'Name', field: 'section' }];

  if (props.classGroup) {
    columns.push(
      { title: 'Year', field: 'year' },
      {
        title: 'teacher',
        render: (rowData: Group) =>
          rowData?.teacher
            ? `${rowData?.teacher?.firstname} ${rowData?.teacher?.lastname}`
            : '',
      },
    );
  }

  return (
    <MaterialTable
      uniqueName="pages/subjects/addSubject/groups/groupTable"
      columns={columns}
      data={(query: Query<Group>) =>
        props.onGetGroups(query).then(res => ({
          page: query.page,
          data: res.groups,
          totalCount: res.totalCount,
        }))
      }
      actions={[{ icon: AddIcon, tooltip: 'select', onClick: () => {} }]}
    />
  );
};

export default GroupTable;
