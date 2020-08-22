import React from 'react';

import DashboardIcon from '@material-ui/icons/Dashboard';
import GroupIcon from '@material-ui/icons/Group';

import routes from 'config/routes';

import { NavigationList } from 'components/withPage/Page/Drawer/types';

const navigationList: NavigationList = [
  {
    label: 'dashboard.index',
    icon: <DashboardIcon />,
    href: routes.dashboard.index,
  },
  { label: 'users.index', icon: <GroupIcon />, href: routes.users.index },
];

export default navigationList;
