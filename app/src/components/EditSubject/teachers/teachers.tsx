import React from 'react';

import AddIcon from '@material-ui/icons/Add';
import { Query } from 'material-table';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';
import MaterialTable from 'lib/material-table';
import useSelectedBackground from 'lib/material-table/useSelectedBackground';

import { Teacher, TeacherProps } from './types';

const Teachers: React.FC<TeacherProps> = props => {
  const { t } = useTranslation(namespaces.components.EditSubject);

  return (
    <MaterialTable
      uniqueName="pages/subjects/editSubject/teacher/teacher"
      title={t('teachers')}
      columns={[]}
      defaultActions={{
        columnFiltering: {
          active: true,
          columns: [
            { title: t('common:gqlObjects.user.email'), field: 'email' },
            {
              title: t('common:gqlObjects.user.firstname'),
              field: 'firstname',
            },
            { title: t('common:gqlObjects.user.lastname'), field: 'lastname' },
          ],
          defaultColumns: ['firstname', 'lastname'],
        },
      }}
      data={(query: Query<Teacher>) =>
        props.onTeacherGet(query).then(res => ({
          page: query.page,
          totalCount: res.totalCount,
          data: res.teachers,
        }))
      }
      actions={[
        {
          icon: AddIcon,
          tooltip: 'Select',
          onClick: (_, row) => {
            row = row as Teacher;
            props.onSelect(row.id);
          },
        },
      ]}
    />
  );
};

export default Teachers;
