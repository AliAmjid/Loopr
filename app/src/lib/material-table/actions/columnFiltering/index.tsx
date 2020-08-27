import React from 'react';

import VisibilityIcon from '@material-ui/icons/Visibility';
import { Action } from 'material-table';

import useColumnFilteringState from 'lib/material-table/actions/columnFiltering/state';

const VisibilityIconWithDisplayName = (): JSX.Element => <VisibilityIcon />;

const columnFilteringAction: Action<any> = {
  icon: VisibilityIconWithDisplayName,
  onClick: () => useColumnFilteringState.setState({ open: true }),
  tooltip: 'Zobrazit',
  isFreeAction: true,
};

export default columnFilteringAction;
