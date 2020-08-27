import React from 'react';

import { Paper } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import namespaces from 'lib/i18n/namespaces';
import MaterialTable from 'lib/material-table';

const Acl: React.FC = () => {
  const { t } = useTranslation(namespaces.pages.acl.index);

  return (
    <Paper>
      <MaterialTable
        title={t('tableTitle')}
        columns={[]}
        data={[{ name: 'asd' }]}
        defaultActions={{
          columnFiltering: {
            active: false,
            columns: undefined,
            defaultColumns: undefined,
          },
        }}
      >
        aho
      </MaterialTable>
    </Paper>
  );
};

export default Acl;
