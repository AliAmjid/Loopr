import React, { useEffect, useState } from 'react';

import AddIcon from '@material-ui/icons/Add';
import { Column, Query } from 'material-table';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';
import MaterialTable from 'lib/material-table';

import { Group, GroupTableProps } from '../types';

const GroupTable: React.FC<GroupTableProps> = props => {
  const { t } = useTranslation(namespaces.components.EditSubject);

  const defaultColumns = [
    { title: t('common:gqlObjects.classGroup.section'), field: 'section' },
  ];
  const [columns, setColumns] = useState<Column<Group>[]>(defaultColumns);
  useEffect(() => {
    if (props.classGroup) {
      setColumns([
        ...defaultColumns,
        { title: t('common:gqlObjects.classGroup.year'), field: 'year' },
        {
          title: t('teacher'),
          render: (rowData: Group) =>
            rowData?.teacher
              ? `${rowData?.teacher?.firstname} ${rowData?.teacher?.lastname}`
              : '',
        },
      ]);
    } else {
      setColumns(defaultColumns);
    }
  }, [props.classGroup]);

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
