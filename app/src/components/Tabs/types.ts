export interface TabsProps {
  tabs: {
    id: number;
    label: string;
    Panel: JSX.Element;
  }[];
  defaultTabsId?: number;
  variant?: 'scrollable' | 'fullWidth';
}
