import { Overrides } from '@material-ui/core/styles/overrides';

import spacing from '../spacing';

import button from './button';
import list from './list';
import navigation from './navigation';
import typography from './typography';

const tabHeight = '30px';

const overrides: Overrides = {
  ...list,
  ...button,
  ...navigation,
  ...typography,
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
  MuiTabs: {
    root: {
      minHeight: tabHeight,
      height: tabHeight,
      minWidth: 10,
      paddingBottom: 1,
    },
  },
  MuiTab: {
    root: {
      minHeight: tabHeight,
      height: tabHeight,
      minWidth: '10px !important',
      padding: spacing * 2,
    },
  },
  MuiDialog: {
    paper: {
      minWidth: spacing * 50,
    },
  },
  MuiCardContent: {
    root: {
      paddingTop: spacing,
      paddingBottom: spacing,
    },
  },
};

export default overrides;
