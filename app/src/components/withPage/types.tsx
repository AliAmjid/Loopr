import { ComponentType } from 'react';

import { Breadcrumbs } from 'components/withPage/Page/AppBar/Breadcrumbs/types';

export interface WithPageInternalProps {
  Component: ComponentType<any>;
  componentProps: any;
  breadcrumbs: Breadcrumbs;
  title: string;
  helpPath?: string;
  resources?: string[][];
}

export interface PageOptions {
  title: string;
  breadcrumbs: Breadcrumbs;
  namespaces?: string[];
  helpPath?: string;
  resources?: string[][];
}
