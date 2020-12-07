import React, { useState } from 'react';

import { Box, Button } from '@material-ui/core';
import { Query } from 'material-table';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';
import MaterialTable from 'lib/material-table';

import { DetailClassGroupUser, StudentsProps } from './types';

const Students: React.FC<StudentsProps> = props => {
  const { t } = useTranslation(namespaces.pages.classGroups.index);

  const [editing, setEditing] = useState(false);

  return (
    <>
      <MaterialTable
        key={`${props.selectedClassGroup}-${editing}`}
        uniqueName="pages/classGroups/classGoup/students"
        title={t('students')}
        data={(query: Query<DetailClassGroupUser>) =>
          editing
            ? props.onGetUsers(query).then(res => ({
                page: query.page,
                totalCount: res.totalCount,
                data: res.users,
              }))
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
              { title: t('email'), field: 'email' },
              { title: t('firstname'), field: 'firstname' },
              { title: t('lastname'), field: 'lastname' },
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
                {t('cancel')}
              </Button>
            </Box>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                props.onSubmit();
                setEditing(false);
              }}
            >
              {t('save')}
            </Button>
          </>
        ) : (
          <Button
            color="primary"
            variant="contained"
            onClick={() => setEditing(true)}
          >
            {t('edit')}
          </Button>
        )}
      </Box>
    </>
  );
};

export default Students;
