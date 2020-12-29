import { createMuiTheme } from '@material-ui/core';

import overrides from './overrides';
import palette from './palette';
import shape from './shape';
import spacing from './spacing';
import transitions from './transitions';

const theme = createMuiTheme({
  palette,
  spacing,
  shape,
  transitions,
  overrides,
});

export default theme;
