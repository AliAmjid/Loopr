import React, { useState } from 'react';

import { Box, Button, Paper } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Query, QueryResult } from 'material-table';

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
  const [columns] = useState([
    {
      title: 'From',
      field: 'from',
      filtering: false,
      render: (data: SchoolPeriod) => formatDateToDay(data.from),
    },
    {
      title: 'to',
      field: 'to',
      filtering: false,
      render: (data: SchoolPeriod) => formatDateToDay(data.to),
    },
    { title: 'quarter', field: 'quarter' },
    { title: 'schoolYear', field: 'schoolYear' },
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
              Delete
            </Button>,
          ]}
        />
        <MaterialTable
          key={`${add} ${deleting}`}
          uniqueName="pages/schoolPeriods"
          title="schoolPeriods"
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
              tooltip: 'delete',
              onClick: (_, row) => {
                row = row as SchoolPeriod;
                setDeleting(row.id);
              },
            },
            {
              icon: EditIcon,
              tooltip: 'edit',
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
            Add
          </Button>
        </Box>
      </OverlayLoadingContainer>
    </Paper>
  );
};

export default SchoolPeriods;
