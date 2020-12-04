import React from 'react';

export interface TabsProps {
  tabs: {
    id: number;
    label: string;
    panel: JSX.Element;
  }[];
  TabWrapper?: React.FC;
  defaultTabsId?: number;
  variant?: 'scrollable' | 'fullWidth';
}
