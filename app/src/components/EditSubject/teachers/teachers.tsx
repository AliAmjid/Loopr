import React from 'react';

import { Box, useTheme } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Query } from 'material-table';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';
import MaterialTable from 'lib/material-table';

import ColorDot from 'components/colorDot';

import { Teacher, TeacherProps } from './types';

const Teachers: React.FC<TeacherProps> = props => {
  const { t } = useTranslation(namespaces.components.EditSubject);
  const theme = useTheme();

  return (
    <MaterialTable
      uniqueName="pages/subjects/editSubject/teacher/teacher"
      title={t('teachers')}
      columns={[
        {
          title: t('common:gqlObjects.user.email'),
          field: 'email',
          // eslint-disable-next-line react/display-name
          render: (data: Teacher) => (
            <Box display="flex" alignItems="center">
              {data.id === props.selectedTeacher ? (
                <Box pr={1}>
                  <ColorDot color={theme.palette.primary.main} />
                </Box>
              ) : (
                ''
              )}
              {data.email}
            </Box>
          ),
        },
        {
          title: t('common:gqlObjects.user.firstname'),
          field: 'firstname',
        },
        { title: t('common:gqlObjects.user.lastname'), field: 'lastname' },
      ]}
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
