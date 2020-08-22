import { ComponentType } from 'react';

import { Breadcrumbs } from 'components/Breadcrumbs/types';

export interface WithPageInternalProps {
  Component: ComponentType<any>;
  componentProps: any;
  breadcrumbs: Breadcrumbs;
  title: string;
}

export interface PageOptions {
  breadcrumbs: Breadcrumbs;
  title: string;
  namespaces?: string[];
}
