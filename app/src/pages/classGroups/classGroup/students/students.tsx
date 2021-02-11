import React, { useState } from 'react';

import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import { Query } from 'material-table';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';
import MaterialTable from 'lib/material-table';

import { ClassGroupUser, StudentsProps } from './types';

const Edit = (): JSX.Element => <EditIcon color="primary" />;
const Done = (): JSX.Element => <DoneIcon color="primary" />;
const Close = (): JSX.Element => <CloseIcon color="error" />;

const Students: React.FC<StudentsProps> = props => {
  const { t } = useTranslation(namespaces.pages.classGroups.index);

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <MaterialTable
        key={`${props.selectedClassGroup}-${editing}`}
        uniqueName="pages/classGroups/classGroup/students"
        isLoading={loading || props.loading}
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
        onSelectionChange={data => {
          props.onSelectionChange(data);
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
              {
                title: t('common:gqlObjects.user.classGroup'),
                field: 'classGroup.id',
                lookup: props.classGroupsLookup,
              },
            ],
            defaultColumns: ['firstname', 'lastname'],
          },
        }}
        actions={[
          {
            tooltip: t('common:actions.edit'),
            icon: Edit,
            onClick: () => setEditing(true),
            position: 'toolbar',
            hidden: editing,
          },
          {
            tooltip: t('common:actions.cancel'),
            icon: Close,
            onClick: () => {
              setEditing(false);
              props.onSelectionClose();
            },
            hidden: !editing,
            isFreeAction: true,
          },
          {
            tooltip: t('common:actions.save'),
            icon: Done,
            onClick: () => {
              setLoading(true);
              props.onSubmit().then(success => {
                setLoading(false);
                if (success) setEditing(false);
              });
            },
            hidden: !editing,
            isFreeAction: true,
          },
        ]}
        options={{ selection: editing, exportButton: !editing }}
      />
    </>
  );
};

export default Students;
