import { Roles, User } from '../types';

export interface OnChangeValues {
  name?: string;
  username?: string;
  role?: string;
}

export interface GeneralInformationProps {
  user: User;
  onChange: (values: OnChangeValues) => Promise<boolean>;
  rolesLookup: Record<string, string>;
}

export interface GeneralInformationIndexProps {
  user: User;
  roles: Roles;
}
