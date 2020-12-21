import React, { useState } from 'react';

import { Box, Button } from '@material-ui/core';
import { Query } from 'material-table';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';
import MaterialTable from 'lib/material-table';

import { ClassGroupUser, StudentsProps } from './types';

const Students: React.FC<StudentsProps> = props => {
  const { t } = useTranslation(namespaces.pages.classGroups.index);

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <MaterialTable
        key={`${props.selectedClassGroup}-${editing}`}
        uniqueName="pages/classGroups/classGroup/students"
        isLoading={loading}
        title={t('students')}
        data={(query: Query<ClassGroupUser>) =>
          editing
            ? props.onGetUsers(query).then(res => {
                return {
                  page: query.page,
                  totalCount: res.totalCount,
                  data: res.users.map(user => ({
                    ...user,
                  })),
                };
              })
            : props.onGetClassGroupUsers(query).then(res => ({
                page: query.page,
                totalCount: res.totalCount,
                data: res.users,
              }))
        }
        onSelectionChange={(data, row) => {
          if (row) {
            props.onSelectionChange({
              id: row?.id,
              selected: row?.tableData?.checked || false,
            });
          }
        }}
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
              {
                title: t('common:gqlObjects.user.lastname'),
                field: 'lastname',
              },
            ],
            defaultColumns: ['firstname', 'lastname', 'email'],
          },
        }}
        options={{ selection: editing }}
      />
      <Box pt={2} display="flex" justifyContent="flex-end">
        {editing ? (
          <>
            <Box pr={2}>
              <Button color="primary" onClick={() => setEditing(false)}>
                {t('common:actions.cancel')}
              </Button>
            </Box>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                setLoading(true);
                props.onSubmit().then(success => {
                  setLoading(false);
                  if (success) setEditing(false);
                });
              }}
            >
              {t('common:actions.save')}
            </Button>
          </>
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
    </>
  );
};

export default Students;