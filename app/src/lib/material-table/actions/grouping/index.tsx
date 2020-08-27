import React from 'react';

import GroupIcon from '@material-ui/icons/GroupWork';
import { Action } from 'material-table';

import useColumnFilteringState from 'lib/material-table/actions/columnFiltering/state';

const GroupIconWithDisplayName = (): JSX.Element => <GroupIcon />;
const groupingAction: Action<any> = {
  icon: GroupIconWithDisplayName,
  onClick: () => useColumnFilteringState.setState({ open: true }),
  tooltip: 'Seskupit',
  isFreeAction: true,
};

export default groupingAction;
