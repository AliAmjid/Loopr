import React from 'react';

import withPage from 'components/withPage';

import subjectPageOptions from './pageOptions';
import PointSystem from './pointSystem';

const PointSystemIndex: React.FC = () => {
  return <PointSystem />;
};

export default withPage(subjectPageOptions)(PointSystemIndex);
