export interface Notification {
  id: string;
  type: string;
  parameters: Record<string, any>;
}

export type Notifications = Notification[];

export interface NotificationsIndexProps {
  notifications: Notifications;
  loading?: boolean;
  onFetchMore: () => void;
}

export interface NotificationsProps {
  notification: Notification;
  onFetchMore?: () => void;
}

export interface ListItemProps {
  innerRef?: any;
  icon: JSX.Element;
  primaryText: string;
  secondaryText: string;
}
