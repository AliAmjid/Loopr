import { User } from '../types';

export interface SystemSettingsIndexProps {
  user: User;
}

export interface SystemSettingsProps {
  user: User;
  onArchive: (archive: boolean) => void;
}
