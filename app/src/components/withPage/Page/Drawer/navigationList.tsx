import React from 'react';

import DashboardIcon from '@material-ui/icons/Dashboard';
import GroupIcon from '@material-ui/icons/Group';
import AclIcon from '@material-ui/icons/HowToReg';

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
    icon: <AclIcon />,
    href: routes.acl.index,
    resources: aclPageResources,
  },
  {
    label: 'classGroups.index',
    icon: <AclIcon />,
    href: routes.classGroups.index,
  },
  { label: 'groups.index', icon: <AclIcon />, href: routes.groups.index },
  {
    label: 'subjects.index',
    icon: <AclIcon />,
    href: routes.subjects.index,
  },
];

export default navigationList;
