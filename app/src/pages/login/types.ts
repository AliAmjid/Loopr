export interface LoginProps {
  onSubmit: (email: string, password: string) => void;
}

export interface FormValues {
  email: string;
  password: string;
}
