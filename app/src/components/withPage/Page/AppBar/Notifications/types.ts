import React from 'react';

import { Notifications } from 'components/Notifications/types';

import { NullableUser } from '../../types';

export interface NotificationsProps {
  anchorEl: HTMLButtonElement | null;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClose: () => void;
  onRead: () => void;
  notifications: Notifications;
  newNotifications: number;
  loading: boolean;
  onFetchMore: () => void;
  onReadAll: () => void;
}

export interface NotificationsIndexProps {
  user: NullableUser;
  bottomElement?: JSX.Element;
  onFetchMore: () => void;
  onResetFetched: () => void;
}
