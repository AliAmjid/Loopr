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

export type DetailGroupUsers =
  | {
      id: string;
      firstname: string;
      lastname: string;
    }[]
  | null
  | undefined;

export type DetailGroup =
  | {
      id: string;
      users: DetailGroupUsers;
    }
  | undefined
  | null;

export interface GroupsProps {
  groups: TableGroups;
  group: DetailGroup;
  groupsLoading: boolean;
  addGroupLoading: boolean;
  onAdd: (values: AddValues) => Promise<boolean>;
  onGroupChange: (id: string) => void;
}

export interface AddDialogProps {
  open: boolean;
  onSubmit: (values: AddValues) => void;
  onClose: () => void;
}

export interface GroupProps {
  group: DetailGroup;
}
