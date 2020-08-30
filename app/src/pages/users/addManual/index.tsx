import React from 'react';

import withPage from 'components/withPage';

import AddManual from './addManual';
import addManualPageOptions from './pageOptions';

const AddManualIndex: React.FC = () => {
  return <AddManual />;
};

export default withPage(addManualPageOptions)(AddManualIndex);
