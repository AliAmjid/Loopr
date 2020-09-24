import React from 'react';

import { Box, Button, Paper } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/router';

import routes from 'config/routes';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';
import MaterialTable from 'lib/material-table';

import { User, UsersProps } from './types';

const VisibilityIconWithDisplayName = (): JSX.Element => <VisibilityIcon />;

const Users: React.FC<UsersProps> = props => {
  const { t } = useTranslation(namespaces.pages.users.index);
  const router = useRouter();

  return (
    <Paper>
      <MaterialTable
        title={t('tableTitle')}
        columns={[]}
        data={props.users}
        options={{ exportButton: true }}
        defaultActions={{
          columnFiltering: {
            active: true,
            defaultColumns: ['name'],
            columns: [
              { section: 'personalInfo' },
              {
                title: 'name',
                field: 'name',
              },
              {
                title: 'username',
                field: 'username',
              },
              {
                title: 'createdAt',
                field: 'createdAt',
                render: (data: User) =>
                  dayjs(data.createdAt).format('DD.MM. YYYY'),
                filtering: false,
              },
              { section: 'access' },
              {
                title: 'role',
                field: 'role.name',
              },
            ],
          },
          grouping: { active: true },
        }}
        actions={[
          {
            tooltip: 'Detail',
            icon: VisibilityIconWithDisplayName,
            onClick: (e, row) => {
              row = row as User;
              router.push({
                pathname: routes.users.userDetail,
                query: { id: row.id },
              });
            },
          },
        ]}
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
