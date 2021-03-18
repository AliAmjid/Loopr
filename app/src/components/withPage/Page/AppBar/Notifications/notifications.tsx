import React from 'react';

import {
  Badge,
  Box,
  Button,
  IconButton,
  Popover,
  Tooltip,
  Typography,
} from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import NotificationsComponent from 'components/Notifications';
import OverlayLoading from 'components/OverlayLoading';
import OverlayLoadingContainer from 'components/OverlayLoading/OverlayLoadingContainer';
import { topShadow } from 'components/shadows';

import { NotificationsProps } from './types';

const Notifications: React.FC<NotificationsProps> = props => {
  const { t } = useTranslation(namespaces.components.withPage);

  return (
    <>
      <Tooltip title={t<string>('notifications')}>
        <IconButton color="inherit" onClick={props.onClick}>
          <Badge badgeContent={props.newNotifications} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <Popover
        open={Boolean(props.anchorEl)}
        anchorEl={props.anchorEl}
        onClose={props.onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <OverlayLoadingContainer>
          <OverlayLoading loading={props.loading} />
          {props.notifications.length === 0 ? (
            <Box p={2}>
              <Typography>{t('noNotifications')}</Typography>
            </Box>
          ) : (
            <NotificationsComponent
              notifications={props.notifications}
              // prettier-ignore
              bottomElement={(
                <Box pt={1.5} pb={1.5} style={{...topShadow(0.25)}}>
                  <Button fullWidth color="primary" onClick={props.onReadAll}>
                    {t('readAllNotifications')}
                  </Button>
                </Box>
              )}
              listStyle={{ width: 300, maxHeight: 400 }}
              onFetchMore={props.onFetchMore}
              onRedirect={props.onRead}
            />
          )}
        </OverlayLoadingContainer>
      </Popover>
    </>
  );
};

export default Notifications;
