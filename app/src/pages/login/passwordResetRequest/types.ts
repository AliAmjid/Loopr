export interface PasswordResetRequestProps {
  onSubmit: (email: string) => Promise<boolean>;
}
