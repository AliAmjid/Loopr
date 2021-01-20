import { NullableUser } from '../types';

export interface DrawerProps {
  user: NullableUser;
}

export interface NavigationProps {
  user: NullableUser;
}

interface NavigationItem {
  label: string;
  icon: JSX.Element;
  href: string;
  subItems?: NavigationItem[];
  resources?: string[][];
}

export type NavigationList = NavigationItem[];
