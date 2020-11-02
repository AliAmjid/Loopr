import { Overrides } from '@material-ui/core/styles/overrides';

import palette from '../palette';

const typography: Overrides = {
  MuiTypography: {
    h6: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      color: palette!.primary.main,
    },
  },
};

export default typography;
