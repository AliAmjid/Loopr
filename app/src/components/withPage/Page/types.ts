import { PropsWithChildren } from 'react';

import { Breadcrumbs } from 'components/withPage/Page/AppBar/Breadcrumbs/types';

export type User =
  | {
      firstname: string;
      lastname: string;
      role?: {
        name?: string;
        resources?: ({ name: string } | undefined | null)[] | null;
      } | null;
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
