import React from 'react';

import AddIcon from '@material-ui/icons/Add';
import { Column, Query } from 'material-table';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';
import MaterialTable from 'lib/material-table';
import useSelectedBackground from 'lib/material-table/useSelectedBackground';

import { Group, GroupTableProps } from '../types';

const GroupTable: React.FC<GroupTableProps> = props => {
  const { t } = useTranslation(namespaces.components.EditSubject);
  const selectedBackground = useSelectedBackground();

  const columns: Column<Group>[] = [
    { title: t('common:gqlObjects.classGroup.section'), field: 'section' },
  ];
  if (props.classGroup) {
    columns.push(
      { title: t('common:gqlObjects.classGroup.year'), field: 'year' },
      {
        title: t('teacher'),
        render: (rowData: Group) =>
          rowData?.teacher
            ? `${rowData?.teacher?.firstname} ${rowData?.teacher?.lastname}`
            : '',
      },
    );
  }

  return (
    <MaterialTable
      title={props.classGroup ? t('classGroups') : t('groups')}
      uniqueName="pages/subjects/editSubject/groups/groupTable"
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
          if (row.id === props.selectedGroup) {
            return { backgroundColor: selectedBackground };
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

            props.onSelectedGroupChange(row.id);
          },
        },
      ]}
    />
  );
};

export default GroupTable;
