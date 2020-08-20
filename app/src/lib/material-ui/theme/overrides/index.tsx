// eslint-disable-next-line import/no-unresolved
import { Overrides } from '@material-ui/core/styles/overrides';

import spacing from 'lib/material-ui/theme/spacing';

import button from './button';
import list from './list';

const overrides: Overrides = {
  ...list,
  ...button,
  MuiPaper: {
    root: {
      padding: spacing * 2,
    },
  },
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
  MuiPopover: {
    paper: {
      padding: 0,
    },
  },
};

export default overrides;
