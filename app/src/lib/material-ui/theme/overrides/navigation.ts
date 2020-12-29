import { Overrides } from '@material-ui/core/styles/overrides';

const navigation: Overrides = {
  MuiAppBar: {
    root: {
      padding: 0,
    },
  },
  MuiDrawer: {
    paper: {
      padding: 0,
    },
  },
};

export default navigation;
