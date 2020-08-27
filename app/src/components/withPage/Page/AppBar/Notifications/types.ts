import React from 'react';

export interface NotificationsUIProps {
  anchorEl: HTMLButtonElement | null;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClose: () => void;
}

export interface ListItemProps {
  icon: JSX.Element;
  primaryText: string;
  secondaryText: string;
}
