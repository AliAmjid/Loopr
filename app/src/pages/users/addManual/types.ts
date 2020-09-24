export interface NewUser {
  name: string;
  username: string;
  role: string;
}

interface Role {
  id: string;
  name: string;
}

export interface AddManualProps {
  onAdd: (user: NewUser) => Promise<boolean>;
  roles: Role[];
  loading: boolean;
}
