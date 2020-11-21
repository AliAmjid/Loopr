import { User } from '../types';

export interface DrawerProps {
  user: User;
}

export interface NavigationProps {
  user: User;
}

interface NavigationItem {
  label: string;
  icon: JSX.Element;
  href: string;
  subItems?: NavigationItem[];
  resources?: string[][];
}

export type NavigationList = NavigationItem[];
