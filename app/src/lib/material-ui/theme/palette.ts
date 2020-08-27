import { amber, red, teal } from '@material-ui/core/colors';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';

const palette: PaletteOptions = {
  primary: {
    main: teal[500],
  },
  secondary: {
    main: amber[500],
  },
  error: {
    main: red[500],
  },
  background: {
    default: '#E8E8E8',
  },
  common: {
    white: '#fff',
    black: '#000',
  },
};

export default palette;
