import React from 'react';

import { fade, useTheme } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Column, Query } from 'material-table';

import MaterialTable from 'lib/material-table';

import useAddSubjectState from 'pages/subjects/addSubject/state';

import { Group, GroupTableProps } from '../types';

const GroupTable: React.FC<GroupTableProps> = props => {
  const theme = useTheme();
  const { group, classGroup, setGroup, setClassGroup } = useAddSubjectState(
    state => ({
      group: state.group,
      classGroup: state.classGroup,
      setGroup: state.setGroup,
      setClassGroup: state.setClassGroup,
    }),
  );

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
      options={{
        rowStyle: (row: Group) => {
          if (row.id === group || row.id === classGroup) {
            return { backgroundColor: fade(theme.palette.primary.main, 0.3) };
          }

          return {};
        },
      }}
      actions={[
        {
          icon: AddIcon,
          tooltip: 'select',
          onClick: (_, row) => {
            row = row as Group;
            if (props.classGroup) {
              setClassGroup(row.id);
            } else {
              setGroup(row.id);
            }
          },
        },
      ]}
    />
  );
};

export default GroupTable;
