import React from 'react';

import { Notifications } from 'components/Notifications/types';

import { NullableUser } from '../../types';

export interface NotificationsProps {
  anchorEl: HTMLButtonElement | null;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClose: () => void;
  notifications: Notifications;
  onFetchMore: () => void;
}

export interface NotificationsIndexProps {
  user: NullableUser;
  onFetchMore: () => void;
}
