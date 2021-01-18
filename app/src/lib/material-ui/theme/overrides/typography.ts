import { Overrides } from '@material-ui/core/styles/overrides';

import palette from '../palette';
import spacing from '../spacing';

const typography: Overrides = {
  MuiTypography: {
    h1: {
      // prettier-ignore
      fontSize: '1.5rem',
      letterSpacing: '0em',
      lineHeight: 1.334,
      fontWeight: 400,
      paddingBottom: spacing,
    },
    h6: {},
    h2: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.6,
      letterSpacing: '0.0075em',
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      color: palette!.primary.main,
    },
    subtitle1: {
      fontSize: '1.2rem',
    },
  },
};

export default typography;
