import React, { useState } from 'react';

import { Box, Button, Paper } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Query, QueryResult } from 'material-table';
import { useTranslation } from 'react-i18next';

import namespaces from 'lib/i18n/namespaces';
import MaterialTable from 'lib/material-table';

import EditDialogIndex from 'pages/schoolPeriods/editDialog';

import { formatDateToDay } from 'components/formatDate';
import OverlayLoading from 'components/OverlayLoading';
import OverlayLoadingContainer from 'components/OverlayLoading/OverlayLoadingContainer';
import SimpleDialog from 'components/SimpleDialog';

import AddDialogIndex from './addDialog';
import { SchoolPeriod, SchoolPeriodsProps } from './types';

const SchoolPeriods: React.FC<SchoolPeriodsProps> = props => {
  const [add, setAdd] = useState(false);
  const [editing, setEditing] = useState<SchoolPeriod | undefined>(undefined);
  const [deleting, setDeleting] = useState<string | undefined>(undefined);
  const { t } = useTranslation(namespaces.pages.schoolPeriods.index);
  const [columns] = useState([
    {
      title: t('common:gqlObjects.schoolPeriod.from'),
      field: 'from',
      filtering: false,
      render: (data: SchoolPeriod) => formatDateToDay(data.from),
    },
    {
      title: t('common:gqlObjects.schoolPeriod.to'),
      field: 'to',
      filtering: false,
      render: (data: SchoolPeriod) => formatDateToDay(data.to),
    },
    { title: t('common:gqlObjects.schoolPeriod.quarter'), field: 'quarter' },
    {
      title: t('common:gqlObjects.schoolPeriod.schoolYear'),
      field: 'schoolYear',
    },
  ]);

  return (
    <Paper>
      <OverlayLoadingContainer>
        <OverlayLoading loading={props.loading} />
        <AddDialogIndex open={add} onClose={() => setAdd(false)} />
        <EditDialogIndex
          id={`${editing?.id}`}
          defaultValues={editing}
          open={editing !== undefined}
          onClose={() => setEditing(undefined)}
        />
        <SimpleDialog
          open={deleting !== undefined}
          title={t('sure')}
          actions={[
            <Button
              key={0}
              color="primary"
              onClick={() => setDeleting(undefined)}
            >
              {t('common:actions.cancel')}
            </Button>,
            <Button
              key={1}
              type="submit"
              color="primary"
              variant="contained"
              onClick={e => {
                e.preventDefault();
                props
                  .onDelete(`${deleting}`)
                  .then(() => setDeleting(undefined));
              }}
            >
              {t('common:actions.delete')}
            </Button>,
          ]}
        />
        <MaterialTable
          key={`${add} ${deleting}`}
          uniqueName="pages/schoolPeriods"
          title={t('title')}
          columns={columns}
          data={(query: Query<SchoolPeriod>) =>
            new Promise<QueryResult<SchoolPeriod>>((resolve, reject) => {
              props
                .getSchoolPeriods(query)
                .then(res => {
                  resolve({
                    page: query.page,
                    totalCount: res.totalCount,
                    data: res.schoolPeriods,
                  });
                })
                .catch(() => {
                  reject();
                });
            })
          }
          actions={[
            {
              icon: DeleteIcon,
              tooltip: t('common:actions.delete'),
              onClick: (_, row) => {
                row = row as SchoolPeriod;
                setDeleting(row.id);
              },
            },
            {
              icon: EditIcon,
              tooltip: t('common:actions.edit'),
              onClick: (_, row) => {
                row = row as SchoolPeriod;
                setEditing(row);
              },
            },
          ]}
        />
        <Box pt={2} display="flex" justifyContent="flex-end">
          <Button
            color="primary"
            variant="contained"
            onClick={() => setAdd(true)}
          >
            {t('common:actions.add')}
          </Button>
        </Box>
      </OverlayLoadingContainer>
    </Paper>
  );
};

export default SchoolPeriods;
