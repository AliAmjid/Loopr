import { MouseEventHandler } from 'react';

export interface SideTableProps {
  title: string;
  loading?: boolean;
  items: {
    id: number | string;
    primary: string;
    secondary?: string;
    selected?: boolean;
    onClick?: () => void;
    onValueChange?: (value: string) => Promise<boolean>;
  }[];
  bottomAction?: {
    icon: JSX.Element;
    onClick: MouseEventHandler<HTMLElement>;
  };
}
