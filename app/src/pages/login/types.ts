export interface LoginProps {
  loading: boolean;
  onSubmit: (email: string, password: string) => void;
}

export interface FormValues {
  email: string;
  password: string;
}
