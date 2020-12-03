import React from 'react';

export interface TabsProps {
  tabs: {
    id: number;
    label: string;
    Panel: JSX.Element;
  }[];
  TabWrapper?: React.FC;
  defaultTabsId?: number;
  variant?: 'scrollable' | 'fullWidth';
}
