import { IconButtonProps } from '@material-ui/core';

export type LanguageSelectProps = IconButtonProps;

export interface LanguageSelectUIProps extends IconButtonProps {
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
}
