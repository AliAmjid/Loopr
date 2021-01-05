import React from 'react';

import withPage from 'components/withPage';

import schoolPeriodsPageOptions from './pageOptions';
import SchoolPeriods from './schoolPeriods';

const SchoolPeriodsIndex: React.FC = () => {
  return <SchoolPeriods />;
};

export default withPage(schoolPeriodsPageOptions)(SchoolPeriodsIndex);
