import React, { useState } from 'react';

import { Box, Button, Paper, Theme, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Link from 'next/link';

import routes from 'config/routes';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';
import MaterialTable from 'lib/material-table';

import stripRolePrefix from 'components/stripRolePrefix';

import {
  AddManualData,
  AddManualDataItem,
  AddManualProps,
  NewUser,
} from './types';

const AddManual: React.FC<AddManualProps> = props => {
  const theme = useTheme();
  const [data, setData] = useState<AddManualData>([]);
  const { t } = useTranslation(namespaces.pages.users.addManual);

  const rolesLookup: Record<string, string> = {};
  props.roles?.forEach(role => {
    rolesLookup[role.id] = stripRolePrefix(role.name);
  });

  return (
    <Paper>
      <MaterialTable
        columns={[
          {
            title: 'username',
            field: 'username',
          },
          { title: 'name', field: 'name' },
          {
            title: 'role',
            field: 'role',
            lookup: rolesLookup,
          },
        ]}
        data={data}
        editable={{
          onRowAdd: (newData: NewUser) =>
            new Promise(resolve => {
              props.onAdd(newData).then((success: boolean) => {
                if (success) {
                  setData([...data, { ...newData, failed: false }]);
                } else {
                  setData([...data, { ...newData, failed: true }]);
                }
                resolve();
              });
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              const dataUpdate = [...data];

              // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
              // @ts-ignore
              const index = oldData?.tableData?.id || 0;
              newData.failed = false;
              dataUpdate[index] = newData;
              setData([...dataUpdate]);

              resolve();
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              const dataDelete = [...data];
              // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
              // @ts-ignore
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setData([...dataDelete]);

              resolve();
            }),
        }}
        options={{
          rowStyle: (data: AddManualDataItem) => {
            if (data.failed) {
              return { backgroundColor: theme.palette.error.main };
            }

            return {};
          },
        }}
      />
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Link href={routes.users.index} passHref>
          <Button color="primary" variant="contained">
            {t('finish')}
          </Button>
        </Link>
      </Box>
    </Paper>
  );
};

export default AddManual;
