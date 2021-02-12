import { UrlObject } from 'url';

export interface Notification {
  id: string;
  type: string;
  parameters: Record<string, any>;
  viewAt: string | null;
}

export type Notifications = Notification[];

export interface NotificationsIndexProps {
  notifications: Notifications;
  loading?: boolean;
  onFetchMore: () => void;
  onRedirect?: () => void;
  bottomElement?: JSX.Element;
}

export interface NotificationsProps {
  notification: Notification;
  onFetchMore?: () => void;
  onRedirect?: () => void;
}

export interface ListItemProps {
  innerRef?: any;
  icon: JSX.Element;
  primaryText: string;
  secondaryText: string;
  viewAt: boolean;
  onClick: () => void;
}

export type Href = UrlObject | string;
