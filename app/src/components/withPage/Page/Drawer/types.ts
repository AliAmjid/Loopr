interface NavigationItem {
  label: string;
  icon: JSX.Element;
  href: string;
  subItems?: NavigationItem[];
}

export type NavigationList = NavigationItem[];
