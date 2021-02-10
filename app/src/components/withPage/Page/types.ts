import { PropsWithChildren } from 'react';

import { Breadcrumbs } from 'components/withPage/Page/AppBar/Breadcrumbs/types';

export interface Notification {
  id: string;
  type: string;
  viewAt: string | null;
  parameters: Record<string, any>;
}

export interface User {
  firstname: string;
  lastname: string;
  role?: {
    name?: string;
    resources?: ({ name: string } | undefined | null)[] | null;
  } | null;
  notifications: Notification[];
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
