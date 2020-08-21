import { ComponentType } from 'react';

export interface WithPageInternalProps {
  Component: ComponentType<any>;
  componentProps: any;
}

export interface PageProps {
  namespaces?: string[];
}
