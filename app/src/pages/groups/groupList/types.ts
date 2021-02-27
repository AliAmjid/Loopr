export interface AddDialogFormValues {
  year: string;
  name: string;
}

export interface AddValues {
  section: string;
}

export interface Group {
  id: string;
  section: string;
  archivedAt: string;
}

type Groups = Group[];

export interface UpdateValues {
  id: string;
  section: string;
}

export interface GroupListProps {
  groups: Groups;
  groupsLoading: boolean;
  addGroupLoading: boolean;
  deleteLoading: boolean;
  archiveLoading: boolean;
  filter: string;
  showArchived: boolean;
  onAdd: (values: AddValues) => Promise<boolean>;
  onSelectedGroupChange: (group: string) => void;
  onUpdate: (values: UpdateValues) => Promise<boolean>;
  onDelete: (group: string) => Promise<boolean>;
  onFilterChange: (filter: string) => void;
  onShowArchivedChange: (show: boolean) => void;
  onArchive: (group: string, archive: boolean) => Promise<boolean>;
}

export interface AddDialogProps {
  open: boolean;
  loading: boolean;
  onSubmit: (values: AddValues) => void;
  onClose: () => void;
}
