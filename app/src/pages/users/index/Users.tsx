import React, { useState } from 'react';

import {
  Box,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility';
import dayjs from 'dayjs';
import { Query, QueryResult } from 'material-table';
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

  const [totalCount, setTotalCount] = useState<undefined | number>(undefined);

  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <Paper>
      <Box pr={1} pl={1}>
        <Grid container>
          <Grid item xs={6}>
            <Box pt={1}>
              <Typography variant="h6">{t('tableTitle')}</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" justifyContent="flex-end">
              <IconButton onClick={e => setMenuAnchorEl(e.currentTarget)}>
                <AddIcon color="primary" />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <MaterialTable
        uniqueName="pages/users/index"
        title=""
        isLoading={props.loading}
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
                    createdAt: dayjs(e?.node?.createdAt).format('DD.MM. YYYY'),
                    archivedAt: e?.node?.archivedAt,
                    archived: e?.node?.archivedAt !== null,
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
                title: t('common:gqlObjects.user.firstname'),
                field: 'firstname',
              },
              {
                title: t('common:gqlObjects.user.lastname'),
                field: 'lastname',
              },
              {
                title: t('common:gqlObjects.user.email'),
                field: 'email',
              },
              {
                title: t('common:gqlObjects.user.createdAt'),
                field: 'createdAt',
                filtering: false,
              },
              {
                title: t('common:gqlObjects.user.role'),
                field: 'role.id',
                lookup: props.rolesLookup,
              },
              {
                title: t('common:gqlObjects.user.archived'),
                field: 'archived',
                lookup: {
                  true: t('common:phrases.yes'),
                  false: t('common:phrases.no'),
                },
                defaultFilter: ['false'],
              },
              {
                title: t('gqlObjects.user.classGroup'),
                field: 'classGroup.id',
                lookup: props.classGroupLookup,
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
            horizontal: 'right',
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
