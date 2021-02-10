import React, { useState } from 'react';

import { useMutation } from '@apollo/client';

import {
  WithPageMarkReadAllNotificationUserMutation,
  WithPageMarkReadAllNotificationUserMutationVariables,
} from 'types/graphql';

import WITH_PAGE_MARK_READ_ALL_NOTIFICATION_USER_MUTATION from '../../../mutations/markReadAllNotificationsUser';

import NotificationsUI from './NotificationsUI';
import { NotificationsIndexProps } from './types';

const Notifications: React.FC<NotificationsIndexProps> = props => {
  const [
    markReadAllNotifications,
    { loading: markReadAllNotificationsLoading },
  ] = useMutation<
    WithPageMarkReadAllNotificationUserMutation,
    WithPageMarkReadAllNotificationUserMutationVariables
  >(WITH_PAGE_MARK_READ_ALL_NOTIFICATION_USER_MUTATION, {
    refetchQueries: ['WithPageMeUserQuery'],
    awaitRefetchQueries: true,
  });
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(e.currentTarget);
  };

  const closeHandler = (): void => {
    setAnchorEl(null);
  };

  const readAllHandler = (): void => {
    markReadAllNotifications({ variables: { input: {} } }).then(() => {
      props.onResetFetched();
      closeHandler();
    });
  };

  return (
    <NotificationsUI
      anchorEl={anchorEl}
      onClick={clickHandler}
      onClose={closeHandler}
      notifications={props.user?.notifications || []}
      newNotifications={props.user?.notificationViewAtNullCount || 0}
      loading={markReadAllNotificationsLoading}
      onFetchMore={props.onFetchMore}
      onReadAll={readAllHandler}
    />
  );
};

export default Notifications;
