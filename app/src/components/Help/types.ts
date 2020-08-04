import { IconButtonProps } from '@material-ui/core';

export interface HelpProps extends IconButtonProps {
  path: string;
}

export interface HelpUIProps extends IconButtonProps {
  onClick: () => void;
}
