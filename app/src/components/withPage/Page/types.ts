import { PropsWithChildren } from 'react';

import { Breadcrumbs } from 'components/withPage/Page/AppBar/Breadcrumbs/types';

export type PageProps = PropsWithChildren<{
  onLogOut: () => void;
  breadcrumbs: Breadcrumbs;
  title: string;
  helpPath?: string;
}>;
