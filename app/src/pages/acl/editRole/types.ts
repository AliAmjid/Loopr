export interface FormValues {
  name: string;
}

export interface EditRoleProps {
  loading: boolean;
  role: {
    name: string;
  };
  onSubmit: (values: FormValues) => void;
}
