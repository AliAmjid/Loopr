import React from 'react';

import { useQuery } from '@apollo/client';
import { Box, Paper, Typography } from '@material-ui/core';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import {
  DashboardNotificationsQuery,
  DashboardNotificationsQueryVariables,
} from 'types/graphql';

import Notifications from 'components/Notifications';
import { Notifications as NotificationsType } from 'components/Notifications/types';
import OverlayLoading from 'components/OverlayLoading';
import OverlayLoadingContainer from 'components/OverlayLoading/OverlayLoadingContainer';

import DASHBOARD_NOTIFICATIONS_QUERY from '../queries/notifications';

const NotificationsIndex: React.FC = () => {
  const { t } = useTranslation(namespaces.pages.dashboard.index);

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
      <OverlayLoadingContainer>
        <OverlayLoading loading={notificationsLoading} />
      </OverlayLoadingContainer>
      <Box pl={2} pt={1}>
        <Typography variant="h6">{t('latestNotifications')}</Typography>
      </Box>
      <Notifications notifications={notifications} />
    </Paper>
  );
};

export default NotificationsIndex;
