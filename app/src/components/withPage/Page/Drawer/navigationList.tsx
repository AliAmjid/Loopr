import React from 'react';

import DashboardIcon from '@material-ui/icons/Dashboard';
import GroupIcon from '@material-ui/icons/Group';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import TableChartIcon from '@material-ui/icons/TableChart';
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

import routes from 'config/routes';

import { aclPageResources } from 'pages/acl/index/pageOptions';

import { NavigationList } from 'components/withPage/Page/Drawer/types';

const navigationList: NavigationList = [
  {
    label: 'dashboard.index',
    icon: <DashboardIcon />,
    href: routes.dashboard.index,
  },
  {
    label: 'users.index',
    icon: <GroupIcon />,
    href: routes.users.index,
  },
  {
    label: 'acl.index',
    icon: <HowToRegIcon />,
    href: routes.acl.index,
    resources: aclPageResources,
  },
  {
    label: 'classGroups.index',
    icon: <TableChartIcon />,
    href: routes.classGroups.index,
  },
  {
    label: 'groups.index',
    icon: <ViewModuleIcon />,
    href: routes.groups.index,
  },
  {
    label: 'subjects.index',
    icon: <ViewListIcon />,
    href: routes.subjects.index,
  },
  {
    label: 'teacherSubjects.index',
    icon: <ViewListIcon />,
    href: routes.teacherSubjects.index,
  },
];

export default navigationList;
