export interface SubmitValues {
  oldPassword: string;
  newPassword1: string;
  newPassword2: string;
}
export interface LoginProps {
  notMatch: boolean;
  loading: boolean;
  onSubmit: (values: SubmitValues) => void;
}
