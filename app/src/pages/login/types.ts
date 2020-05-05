import { WithTranslation } from 'next-i18next';

export interface LoginProps extends WithTranslation {
  onSubmit: (email: string, password: string) => void;
}

export interface FormValues {
  email: string;
  password: string;
}
