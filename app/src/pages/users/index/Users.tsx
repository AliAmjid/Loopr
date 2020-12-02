import React, { useState } from 'react';

import { Box, Button, Menu, MenuItem, Paper } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import dayjs from 'dayjs';
import { Query, QueryResult } from 'material-table';
import Link from 'next/link';
import { useRouter } from 'next/router';

import routes from 'config/routes';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';
import MaterialTable from 'lib/material-table';

import stripRolePrefix from 'components/stripRolePrefix';

import { User, UsersProps } from './types';

const VisibilityIconWithDisplayName = (): JSX.Element => <VisibilityIcon />;

const Users: React.FC<UsersProps> = props => {
  const { t } = useTranslation(namespaces.pages.users.index);
  const router = useRouter();

  const [totalCount, setTotalCount] = useState<undefined | number>(undefined);

  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <Paper>
      <MaterialTable
        uniqueName="pages/users/index"
        title={t('tableTitle')}
        columns={[]}
        data={(query: Query<User>) =>
          new Promise<QueryResult<User>>((resolve, reject) => {
            props.getUsers(query).then(res => {
              if (res.data?.users !== null && res.data?.users !== undefined) {
                setTotalCount(res.data.users.totalCount);
                resolve({
                  page: query.page,
                  totalCount: res.data.users.totalCount,
                  data: (res.data.users.edges?.map(e => ({
                    ...e?.node,
                    role: { name: stripRolePrefix(e?.node?.role?.name || '') },
                    createdAt: dayjs(e?.node?.createdAt).format('DD.MM. YYYY'),
                  })) || []) as User[],
                });
              }

              reject();
            });
          })
        }
        totalCount={totalCount}
        options={{ exportButton: true }}
        defaultActions={{
          columnFiltering: {
            active: true,
            defaultColumns: ['firstname', 'lastname'],
            columns: [
              { section: 'personalInfo' },
              {
                title: t('columns.firstname'),
                field: 'firstname',
              },
              {
                title: t('columns.lastname'),
                field: 'lastname',
              },
              {
                title: t('columns.email'),
                field: 'email',
              },
              {
                title: t('columns.createdAt'),
                field: 'createdAt',
                filtering: false,
              },
              {
                title: t('columns.role'),
                field: 'role.name',
                filtering: false,
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
          {t('addUsers.button')}
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
            <MenuItem>{t('addUsers.manual')}</MenuItem>
          </Link>
          <Link href={routes.users.addCSV} passHref>
            <MenuItem>{t('addUsers.csv')}</MenuItem>
          </Link>
        </Menu>
      </Box>
    </Paper>
  );
};

export default Users;
