import { MouseEventHandler } from 'react';

export interface SideListProps {
  title: string;
  loading?: boolean;
  items: {
    id: number | string;
    primary: string;
    secondary?: string;
    onClick?: () => void;
    onValueChange?: (value: string) => Promise<boolean>;
    additionalActions?: JSX.Element[];
  }[];
  topElement?: JSX.Element;
  bottomAction?: {
    icon: JSX.Element;
    onClick: MouseEventHandler<HTMLElement>;
    tooltip?: string;
  };
  filter?: string;
  onFilterChange?: (filter: string) => void;
}

export interface SideListGridProps {
  sideList: JSX.Element;
  body: JSX.Element;
}
