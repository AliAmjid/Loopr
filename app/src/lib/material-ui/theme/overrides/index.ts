import { Overrides } from '@material-ui/core/styles/overrides';

import spacing from '../spacing';

import button from './button';
import list from './list';
import navigation from './navigation';

const overrides: Overrides = {
  ...list,
  ...button,
  ...navigation,
  MuiPaper: {
    root: {
      padding: spacing * 2,
    },
  },
  MuiPopover: {
    paper: {
      padding: 0,
    },
  },
};

export default overrides;
