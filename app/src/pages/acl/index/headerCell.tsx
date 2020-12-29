import React from 'react';

import { Box, IconButton, Tooltip } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import Link from 'next/link';

import routes from 'config/routes';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import { HeaderCellProps } from './types';

const HeaderCell: React.FC<HeaderCellProps> = ({ roleName, roleId }) => {
  const { t } = useTranslation(namespaces.pages.acl.index);

  return (
    <Box display="flex" alignItems="center">
      <Box pr={1}>{roleName}</Box>
      <Link
        href={{ pathname: routes.acl.editRole, query: { id: roleId } }}
        passHref
      >
        <Tooltip title={t('edit').toString()}>
          <IconButton size="small">
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Link>
    </Box>
  );
};

export default HeaderCell;
