import React from 'react';

import VisibilityIcon from '@material-ui/icons/Visibility';
import { Action } from 'material-table';
import { TFunction } from 'next-i18next';

import useColumnFilteringState from './state';

const VisibilityIconWithDisplayName = (): JSX.Element => <VisibilityIcon />;

const columnFilteringAction = (t: TFunction): Action<any> => ({
  icon: VisibilityIconWithDisplayName,
  onClick: () => useColumnFilteringState.setState({ open: true }),
  tooltip: t('defaultActions.columnFiltering.tooltip'),
  isFreeAction: true,
});

export default columnFilteringAction;
