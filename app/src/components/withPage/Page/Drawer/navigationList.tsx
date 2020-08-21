import React from 'react';

import DashboardIcon from '@material-ui/icons/Dashboard';

import routes from 'config/routes';

import { NavigationList } from 'components/withPage/Page/Drawer/types';

const navigationList: NavigationList = [
  { label: 'dashboard', icon: <DashboardIcon />, href: routes.dashboard.index },
];

export default navigationList;
