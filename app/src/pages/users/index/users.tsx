import React from 'react';

import { Box, Button, Paper } from '@material-ui/core';
import Link from 'next/link';

import routes from 'config/routes';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';
import MaterialTable from 'lib/material-table';

const Users: React.FC = () => {
  const { t } = useTranslation(namespaces.pages.users.index);

  return (
    <Paper>
      <MaterialTable
        title={t('tableTitle')}
        columns={[]}
        data={[
          { name: 'Igor Hnízdo', class: '3B', email: 'ahoj@ahoj.cz' },
          { name: 'Pavel Laško', class: '3B', email: 'ahoj@ahoj.cz' },
          { name: 'Lucie Černá', class: '4B', email: 'ahoj@ahoj.cz' },
        ]}
        options={{ exportButton: true }}
        defaultActions={{
          columnFiltering: {
            active: true,
            defaultColumns: ['name'],
            columns: [
              { section: 'Osobní údaje' },
              { title: 'Jméno', field: 'name' },
              { title: 'Email', field: 'email' },
              { section: 'Zařazení' },
              { title: 'Třída', field: 'class' },
            ],
          },
          grouping: { active: true },
        }}
      />
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Link href={routes.users.addManual} passHref>
          <Button color="primary" variant="contained">
            {t('addUsers')}
          </Button>
        </Link>
      </Box>
    </Paper>
  );
};

export default Users;
