export interface NewUser {
  name: string;
  username: string;
  role: string;
}

export interface Role {
  id: string;
  name: string;
}

export interface AddManualProps {
  onAdd: (user: NewUser) => Promise<boolean>;
  roles: Role[];
  loading: boolean;
}

export interface AddManualDataItem extends NewUser {
  failed: boolean;
}

export type AddManualData = AddManualDataItem[];
