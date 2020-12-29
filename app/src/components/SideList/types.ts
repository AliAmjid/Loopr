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
  bottomAction?: {
    icon: JSX.Element;
    onClick: MouseEventHandler<HTMLElement>;
    tooltip?: string;
  };
}

export interface SideListGridProps {
  sideList: JSX.Element;
  body: JSX.Element;
}
