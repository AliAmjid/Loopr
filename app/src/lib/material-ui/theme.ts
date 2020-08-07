import { createMuiTheme } from '@material-ui/core';
import { amber, red, teal } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
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
  },
});

export default theme;
