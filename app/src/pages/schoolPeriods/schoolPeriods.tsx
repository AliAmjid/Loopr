import React, { useState } from 'react';

import { Box, Button, Paper } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Query, QueryResult } from 'material-table';

import MaterialTable from 'lib/material-table';

import { formatDateToDay } from 'components/formatDate';
import SimpleDialog from 'components/SimpleDialog';

import AddDialogIndex from './addDialog';
import { SchoolPeriod, SchoolPeriodsProps } from './types';

const SchoolPeriods: React.FC<SchoolPeriodsProps> = props => {
  const [add, setAdd] = useState(false);
  const [deleting, setDeleting] = useState<string | undefined>(undefined);

  return (
    <Paper>
      <AddDialogIndex open={add} onClose={() => setAdd(false)} />
      <SimpleDialog
        open={deleting !== undefined}
        title="Sure?"
        actions={[
          <Button
            key={0}
            color="primary"
            onClick={() => setDeleting(undefined)}
          >
            Cancel
          </Button>,
          <Button
            key={1}
            color="primary"
            variant="contained"
            onClick={() => {
              props.onDelete(`${deleting}`);
              setDeleting(undefined);
            }}
          >
            Delete
          </Button>,
        ]}
      />
      <MaterialTable
        key={`${add}`}
        uniqueName="pages/schoolPeriods"
        title="schoolPeriods"
        columns={[
          {
            title: 'From',
            field: 'from',
            render: (data: SchoolPeriod) => formatDateToDay(data.from),
          },
          {
            title: 'to',
            field: 'to',
            render: (data: SchoolPeriod) => formatDateToDay(data.to),
          },
          { title: 'quarter', field: 'quarter' },
          { title: 'schoolYear', field: 'schoolYear' },
        ]}
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
            tooltip: 'delete',
            onClick: (_, row) => {
              row = row as SchoolPeriod;
              setDeleting(row.id);
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
          Add
        </Button>
      </Box>
    </Paper>
  );
};

export default SchoolPeriods;
