import React from 'react';

import { Box, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import Link from 'next/link';

import routes from 'config/routes';

import { HeaderCellProps } from './types';

const HeaderCell: React.FC<HeaderCellProps> = ({ roleName, roleId }) => {
  return (
    <Box display="flex" alignItems="center">
      <Box pr={1}>{roleName}</Box>
      <Link
        href={{ pathname: routes.acl.editRole, query: { id: roleId } }}
        passHref
      >
        <IconButton size="small">
          <EditIcon />
        </IconButton>
      </Link>
    </Box>
  );
};

export default HeaderCell;
