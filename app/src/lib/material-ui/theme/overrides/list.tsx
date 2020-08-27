import { Overrides } from '@material-ui/core/styles/overrides';

import shape from 'lib/material-ui/theme/shape';
import spacing from 'lib/material-ui/theme/spacing';

const list: Overrides = {
  MuiList: {
    root: {
      padding: +spacing,
    },
  },
  MuiListItem: {
    root: {
      borderRadius: shape.borderRadius,
    },
  },
};

export default list;
