export type ChangedState = {
  id: string;
  selected: boolean;
}[];

export type ChangeItems = {
  id: string;
  tableData?: { checked?: boolean };
}[];

export interface UseSelectionChange {
  changed: ChangedState;
  change: (items: ChangeItems) => void;
  reset: () => void;
  setDefault: (items: ChangedState) => void;
}
