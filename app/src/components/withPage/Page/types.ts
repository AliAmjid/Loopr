import { PropsWithChildren } from 'react';

import { Notifications } from 'components/Notifications/types';
import { Breadcrumbs } from 'components/withPage/Page/AppBar/Breadcrumbs/types';

export interface User {
  firstname: string;
  lastname: string;
  role?: {
    name?: string;
    resources?: ({ name: string } | undefined | null)[] | null;
  } | null;
  notifications: Notifications;
  notificationViewAtNullCount: number;
}

export type NullableUser = User | null | undefined;

export type PageProps = PropsWithChildren<{
  onLogOut: () => void;
  breadcrumbs: Breadcrumbs;
  title: string;
  helpPath?: string;
  user: NullableUser;
  onFetchMoreNotifications: () => void;
  onResetFetchedMoreNotifications: () => void;
}>;

export interface PageState {
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
}
