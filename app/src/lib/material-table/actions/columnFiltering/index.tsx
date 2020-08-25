import React from 'react';

import VisibilityIcon from '@material-ui/icons/Visibility';
import { Action } from 'material-table';

import { ColumnFilteringProps } from 'lib/material-table/actions/columnFiltering/types';

const VisibilityIconWithDisplayName = (): JSX.Element => <VisibilityIcon />;

const columnFiltering = (props: ColumnFilteringProps): Action<any> => ({
  icon: VisibilityIconWithDisplayName,
  onClick: props.onClick,
  tooltip: 'Zobrazit',
  isFreeAction: true,
});

export default columnFiltering;
