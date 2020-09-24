export interface AddUser {
  name: string;
  username: string;
  role: string;
}

export interface NewUser extends AddUser {
  id: string;
}

export interface Role {
  id: string;
  name: string;
}

export interface HandlerReturn {
  id: string;
  success: boolean;
}

export interface AddManualProps {
  roles: Role[];
  loading: boolean;
  onAdd: (user: AddUser) => Promise<HandlerReturn>;
  onUpdate: (user: NewUser) => Promise<boolean>;
}

export interface AddManualDataItem extends NewUser {
  failed: boolean;
}

export type AddManualData = AddManualDataItem[];
