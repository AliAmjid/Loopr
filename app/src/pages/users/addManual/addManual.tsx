import React, { useState } from 'react';

import { Box, Button, Paper } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import namespaces from 'lib/i18n/namespaces';
import MaterialTable from 'lib/material-table';

const AddManual: React.FC = () => {
  const [data, setData] = useState([]);
  const { t } = useTranslation(namespaces.pages.users.addManual);

  return (
    <Paper>
      <MaterialTable
        columns={[
          { title: 'email', field: 'email' },
          { title: 'name', field: 'name' },
          { title: 'surname', field: 'surname' },
          {
            title: 'class',
            field: 'class',
            lookup: { idA: '1.B', idb: '2.B', idc: '3.B' },
          },
        ]}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setData([...data, newData]);

              resolve();
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
        <Button
          color="primary"
          variant="contained"
          disabled={data.length === 0}
        >
          {t('add')}
        </Button>
      </Box>
    </Paper>
  );
};

export default AddManual;
