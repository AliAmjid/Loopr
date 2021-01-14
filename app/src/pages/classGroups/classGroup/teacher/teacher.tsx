import React, { useState } from 'react';

import { Box, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Query } from 'material-table';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';
import MaterialTable from 'lib/material-table';

import OverlayLoading from 'components/OverlayLoading';
import OverlayLoadingContainer from 'components/OverlayLoading/OverlayLoadingContainer';

import { DetailClassGroupUser, TeacherProps } from './types';

const Teacher: React.FC<TeacherProps> = props => {
  const { t } = useTranslation(namespaces.pages.classGroups.index);

  const [editing, setEditing] = useState(false);

  return (
    <OverlayLoadingContainer>
      <OverlayLoading loading={props.loading} />
      <MaterialTable
        key={`${editing}`}
        title={t('teacher')}
        uniqueName="pages/classGroups/classGroup/teacher"
        data={(() => {
          if (!editing) {
            return props.teacher ? [props.teacher] : [];
          }

          return (query: Query<DetailClassGroupUser>) =>
            props.onGetUsers(query).then(res => ({
              page: query.page,
              totalCount: res.totalCount,
              data: res.users,
            }));
        })()}
        columns={[]}
        defaultActions={{
          columnFiltering: {
            active: true,
            columns: [
              {
                title: t('common:gqlObjects.user.email'),
                field: 'email',
              },
              {
                title: t('common:gqlObjects.user.firstname'),
                field: 'firstname',
              },
              {
                title: t('common:gqlObjects.user.lastname'),
                field: 'lastname',
              },
            ],
            defaultColumns: ['firstname', 'lastname', 'email'],
          },
        }}
        options={{
          exportButton: !editing,
        }}
        actions={
          editing
            ? [
                {
                  icon: AddIcon,
                  tooltip: t('common:actions.select'),
                  onClick: (_, row) => {
                    row = row as DetailClassGroupUser;
                    props.onChange(row.id).then(successful => {
                      if (successful) setEditing(false);
                    });
                  },
                },
              ]
            : []
        }
      />
      <Box pt={2} display="flex" justifyContent="flex-end">
        {editing ? (
          <Button color="primary" onClick={() => setEditing(false)}>
            {t('common:actions.cancel')}
          </Button>
        ) : (
          <Button
            color="primary"
            variant="contained"
            onClick={() => setEditing(true)}
          >
            {t('common:actions.edit')}
          </Button>
        )}
      </Box>
    </OverlayLoadingContainer>
  );
};

export default Teacher;
