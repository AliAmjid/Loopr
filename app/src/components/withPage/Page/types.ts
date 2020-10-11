import { PropsWithChildren } from 'react';

import { Breadcrumbs } from 'components/withPage/Page/AppBar/Breadcrumbs/types';

export type User =
  | {
      name: string;
      role: { name: string };
    }
  | null
  | undefined;

export type PageProps = PropsWithChildren<{
  onLogOut: () => void;
  breadcrumbs: Breadcrumbs;
  title: string;
  helpPath?: string;
  user: User;
}>;

export interface PageState {
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
}
