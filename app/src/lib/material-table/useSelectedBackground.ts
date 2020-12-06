import { fade, useTheme } from '@material-ui/core';

const useSelectedBackground = (): string => {
  const theme = useTheme();

  return fade(theme.palette.primary.main, 0.22);
};

export default useSelectedBackground;
