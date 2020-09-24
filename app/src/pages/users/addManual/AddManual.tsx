import React, { useState } from 'react';

import { Box, Button, Paper } from '@material-ui/core';
import Link from 'next/link';

import routes from 'config/routes';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';
import MaterialTable from 'lib/material-table';

import stripRolePrefix from 'components/stripRolePrefix';

import { AddManualProps, NewUser } from './types';

const AddManual: React.FC<AddManualProps> = props => {
  const [data, setData] = useState<NewUser[]>([]);
  const { t } = useTranslation(namespaces.pages.users.addManual);

  const rolesLookup: Record<string, string> = {};
  props.roles?.forEach(role => {
    rolesLookup[role.id] = stripRolePrefix(role.name);
  });

  return (
    <Paper>
      <MaterialTable
        columns={[
          { title: 'username', field: 'username' },
          { title: 'name', field: 'name' },
          { title: 'role', field: 'role', lookup: rolesLookup },
        ]}
        data={data}
        editable={{
          onRowAdd: (newData: NewUser) =>
            new Promise((resolve, reject) => {
              props.onAdd(newData).then((success: boolean) => {
                if (success) {
                  setData([...data, newData]);
                  resolve();
                } else {
                  reject();
                }
              });
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              const dataUpdate = [...data];

              // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
              // @ts-ignore
              const index = oldData?.tableData?.id || 0;
              dataUpdate[index] = newData;
              setData([...dataUpdate]);

              resolve();
            }),
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
