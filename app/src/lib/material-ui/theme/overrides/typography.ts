import { Overrides } from '@material-ui/core/styles/overrides';

import palette from '../palette';
import spacing from '../spacing';

const typography: Overrides = {
  MuiTypography: {
    h6: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      color: palette!.primary.main,
    },
    h5: {
      fontWeight: 500,
      paddingBottom: spacing,
    },
    subtitle1: {
      fontSize: '1.2rem',
    },
  },
};

export default typography;
