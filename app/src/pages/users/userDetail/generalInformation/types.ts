import { Roles, User } from '../types';

export interface OnChangeValues {
  firstname?: string;
  lastname?: string;
  email?: string;
  role?: string;
}

export interface GeneralInformationProps {
  user: User;
  rolesLookup: Record<string, string>;
  onChange: (values: OnChangeValues) => Promise<boolean>;
  onArchive: (archive: boolean) => void;
}

export interface GeneralInformationIndexProps {
  user: User;
  roles: Roles;
}
