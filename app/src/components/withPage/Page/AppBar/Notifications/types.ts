import React from 'react';

import { Notification, NullableUser } from '../../types';

export interface NotificationsUIProps {
  anchorEl: HTMLButtonElement | null;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClose: () => void;
  notifications: Notification[];
  onFetchMore: () => void;
}

export interface ListItemProps {
  innerRef?: any;
  icon: JSX.Element;
  primaryText: string;
  secondaryText: string;
}

export interface NotificationsIndexProps {
  user: NullableUser;
  onFetchMore: () => void;
}

export interface NotificationProps {
  notification: Notification;
  fetchMore?: () => void;
}
