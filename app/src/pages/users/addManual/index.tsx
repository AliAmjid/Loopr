import React from 'react';

import { Paper } from '@material-ui/core';

import UserImportTable from 'components/UserImportTable';
import withPage from 'components/withPage';

import addManualPageOptions from './pageOptions';

const AddManualIndex: React.FC = () => {
  return (
    <Paper>
      <UserImportTable />
    </Paper>
  );
};

export default withPage(addManualPageOptions)(AddManualIndex);
