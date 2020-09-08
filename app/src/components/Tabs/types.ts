export interface TabsProps {
  tabs: {
    id: number;
    label: string;
    panel: JSX.Element;
  }[];
  defaultTabsId?: number;
  variant?: 'scrollable' | 'fullWidth';
}
