import React, { useState } from 'react';

import { useMutation } from '@apollo/client';

import {
  WithPageMarkReadAllNotificationUserMutation,
  WithPageMarkReadAllNotificationUserMutationVariables,
} from 'types/graphql';

import WITH_PAGE_MARK_READ_ALL_NOTIFICATION_USER_MUTATION from '../../../mutations/markReadAllNotificationsUser';

import Notifications from './notifications';
import { NotificationsIndexProps } from './types';

const NotificationsIndex: React.FC<NotificationsIndexProps> = props => {
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
  const readHandler = (): void => {
    props.onResetFetched();
    closeHandler();
  };

  const readAllHandler = (): void => {
    markReadAllNotifications({ variables: { input: {} } }).then(() => {
      props.onResetFetched();
      closeHandler();
    });
  };

  return (
    <Notifications
      anchorEl={anchorEl}
      onClick={clickHandler}
      onClose={closeHandler}
      onRead={readHandler}
      notifications={props.user?.notifications || []}
      newNotifications={props.user?.notificationViewAtNullCount || 0}
      loading={markReadAllNotificationsLoading}
      onFetchMore={props.onFetchMore}
      onReadAll={readAllHandler}
    />
  );
};

export default NotificationsIndex;
