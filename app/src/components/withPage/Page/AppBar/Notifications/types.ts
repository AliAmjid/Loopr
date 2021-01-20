import React from 'react';

import { Notification, NullableUser } from '../../types';

export interface NotificationsUIProps {
  anchorEl: HTMLButtonElement | null;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClose: () => void;
  notifications: Notification[];
}

export interface ListItemProps {
  icon: JSX.Element;
  primaryText: string;
  secondaryText: string;
}

export interface NotificationsIndexProps {
  user: NullableUser;
}
