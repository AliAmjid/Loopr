import React from 'react';

import { UrlObject } from 'url';

import { Notification, NullableUser } from '../../types';

export interface NotificationsUIProps {
  anchorEl: HTMLButtonElement | null;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClose: () => void;
  notifications: Notification[];
  onFetchMore: () => void;
}

export type Href = undefined | string | (UrlObject & string);

export interface ListItemProps {
  innerRef?: any;
  icon: JSX.Element;
  primaryText: string;
  secondaryText: string;
  href: Href;
  viewAt: boolean;
  onClick: () => void;
}

export interface NotificationsIndexProps {
  user: NullableUser;
  onFetchMore: () => void;
}

export interface NotificationProps {
  notification: Notification;
  fetchMore?: () => void;
}
