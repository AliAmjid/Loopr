import React from 'react';

import AppsIcon from '@material-ui/icons/Apps';
import AssessmentIcon from '@material-ui/icons/Assessment';
import DashboardIcon from '@material-ui/icons/Dashboard';
import GroupIcon from '@material-ui/icons/Group';
import HistoryIcon from '@material-ui/icons/History';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import TableChartIcon from '@material-ui/icons/TableChart';
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

import routes from 'config/routes';

import { aclPageResources } from 'pages/acl/index/pageOptions';
import { classGroupsResources } from 'pages/classGroups/pageOptions';
import { groupsResources } from 'pages/groups/pageOptions';
import { schoolPeriodsResources } from 'pages/schoolPeriods/pageOptions';
import { studentSubjectsResources } from 'pages/studentSubjects/pageOptions';
import { subjectsResources } from 'pages/subjects/index/pageOptions';
import { teacherSubjectsResources } from 'pages/teacherSubjects/index/pageOptions';
import { usersResources } from 'pages/users/index/pageOptions';

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
    resources: usersResources,
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
    resources: classGroupsResources,
  },
  {
    label: 'groups.index',
    icon: <ViewModuleIcon />,
    href: routes.groups.index,
    resources: groupsResources,
  },
  {
    label: 'subjects.index',
    icon: <ViewListIcon />,
    href: routes.subjects.index,
    resources: subjectsResources,
  },
  {
    label: 'schoolPeriods.index',
    icon: <HistoryIcon />,
    href: routes.schoolPeriods.index,
    resources: schoolPeriodsResources,
  },
  {
    label: 'teacherSubjects.index',
    icon: <AppsIcon />,
    href: routes.teacherSubjects.index,
    resources: teacherSubjectsResources,
  },
  {
    label: 'studentSubjects.index',
    icon: <AssessmentIcon />,
    href: routes.studentSubjects.index,
    resources: studentSubjectsResources,
  },
];

export default navigationList;
