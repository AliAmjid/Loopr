import React from 'react';

import { Box, Typography } from '@material-ui/core';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import Teacher from 'pages/classGroups/classGroup/teacher';

import Tabs from 'components/Tabs';

import Students from './students';
import { ClassGroupProps } from './types';

const TabWrapper: React.FC = props => (
  <Box p={2} pt={0}>
    {props.children}
  </Box>
);

const ClassGroup: React.FC<ClassGroupProps> = props => {
  const { t } = useTranslation(namespaces.pages.classGroups.index);

  if (!props.selectedClassGroup)
    return (
      <Box
        width="100%"
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography>{t('nothingSelected')}</Typography>
      </Box>
    );

  return (
    <Tabs
      variant="fullWidth"
      TabWrapper={TabWrapper}
      tabs={[
        {
          id: 0,
          label: t('students'),
          panel: (
            <Students
              selectedClassGroup={props.selectedClassGroup}
              onGetUsers={query => props.onGetUsers(query, false)}
              onGetClassGroupUsers={props.onGetClassGroupUsers}
              onSelectionChange={props.onStudentsChange}
              onSubmit={props.onStudentsSubmit}
            />
          ),
        },
        {
          id: 1,
          label: t('teacher'),
          panel: (
            <Teacher
              teacher={props.teacher}
              loading={props.teacherLoading}
              onGetUsers={query => props.onGetUsers(query, true)}
              onChange={props.onTeacherChange}
            />
          ),
        },
      ]}
    />
  );
};

export default ClassGroup;
