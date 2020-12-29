import { User } from '../types';

export interface AppBarProps {
  onLogOut: () => void;
  helpPath?: string;
  user: User;
}
