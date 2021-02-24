import { NullableUser } from '../types';

export interface AppBarProps {
  onLogOut: () => void;
  helpPath?: string;
  user: NullableUser;
  onFetchMoreNotifications: () => void;
  onResetFetchedMoreNotifications: () => void;
}
