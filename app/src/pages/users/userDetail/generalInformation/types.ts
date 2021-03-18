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
}

export interface GeneralInformationIndexProps {
  user: User;
  roles: Roles;
}
