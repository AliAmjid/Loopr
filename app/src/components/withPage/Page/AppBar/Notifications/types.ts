import React from 'react';

import { UrlObject } from 'url';

import { Notification, NullableUser } from '../../types';

import { NullableUser } from '../../types';

export interface NotificationsProps {
  anchorEl: HTMLButtonElement | null;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClose: () => void;
  notifications: Notification[];
  newNotifications: number;
  loading: boolean;
  onFetchMore: () => void;
  onReadAll: () => void;
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
  onResetFetched: () => void;
}

export interface NotificationProps {
  notification: Notification;
  onClose: () => void;
  fetchMore?: () => void;
}
