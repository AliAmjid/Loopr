import React from 'react';

import GroupIcon from '@material-ui/icons/GroupWork';
import { Action } from 'material-table';
import { TFunction } from 'next-i18next';

import useGroupingState from './state';

const GroupIconWithDisplayName = (): JSX.Element => <GroupIcon />;
const groupingAction = (t: TFunction): Action<any> => ({
  icon: GroupIconWithDisplayName,
  onClick: () =>
    useGroupingState.setState(state => ({ active: !state.active })),
  tooltip: t('defaultActions.grouping.tooltip'),
  isFreeAction: true,
});

export default groupingAction;
