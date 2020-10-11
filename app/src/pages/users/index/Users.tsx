import React, { useState } from 'react';

import { Box, Button, Menu, MenuItem, Paper } from '@material-ui/core';
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

  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);

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
        <Button
          aria-controls="users-addButton"
          color="primary"
          variant="contained"
          onClick={e => setMenuAnchorEl(e.currentTarget)}
        >
          {t('addUsers')}
        </Button>

        <Menu
          id="users-addButton"
          open={Boolean(menuAnchorEl)}
          onClose={() => setMenuAnchorEl(null)}
          anchorEl={menuAnchorEl}
          keepMounted
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Link href={routes.users.addManual} passHref>
            <MenuItem>Manual</MenuItem>
          </Link>
          <Link href={routes.users.addCSV} passHref>
            <MenuItem>CSV</MenuItem>
          </Link>
        </Menu>
      </Box>
    </Paper>
  );
};

export default Users;
