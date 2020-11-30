import { graphUndefinedError } from 'apollo/lib/utils/sharedMessages';

export interface AddDialogFormValues {
  year: string;
  name: string;
}

export interface AddValues {
  year: number;
  section: string;
}

export interface TableGroup {
  id: string;
  year: number;
  section: string;
}

export type TableGroups = TableGroup[];

export interface GroupsProps {
  groups: TableGroups;
  groupsLoading: boolean;
  addGroupLoading: boolean;
  onAdd: (values: AddValues) => Promise<boolean>;
}

export interface AddDialogProps {
  open: boolean;
  onSubmit: (values: AddValues) => void;
  onClose: () => void;
}
