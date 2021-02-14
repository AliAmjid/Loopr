import React from 'react';

import { useQuery } from '@apollo/client';
import { Paper, Typography } from '@material-ui/core';

import {
  DashboardNotificationsQuery,
  DashboardNotificationsQueryVariables,
} from 'types/graphql';

import Notifications from 'components/Notifications';
import { Notifications as NotificationsType } from 'components/Notifications/types';

import DASHBOARD_NOTIFICATIONS_QUERY from '../queries/notifications';

const NotificationsIndex: React.FC = () => {
  const { data: notificationsData, loading: notificationsLoading } = useQuery<
    DashboardNotificationsQuery,
    DashboardNotificationsQueryVariables
  >(DASHBOARD_NOTIFICATIONS_QUERY, { variables: { first: 5 } });

  const notifications: NotificationsType = [];
  notificationsData?.meUser?.notifications?.edges?.forEach(edge => {
    const node = edge?.node;
    if (node) notifications.push(node);
  });

  return (
    <Paper>
      <Typography variant="h6">latest notifications</Typography>
      <Notifications
        notifications={notifications}
        loading={notificationsLoading}
      />
    </Paper>
  );
};

export default NotificationsIndex;
