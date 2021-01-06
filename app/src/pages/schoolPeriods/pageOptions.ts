import routes from 'config/routes';

import { PageOptions } from 'components/withPage/types';

const schoolPeriodsPageOptions: PageOptions = {
  title: 'schoolPeriods.index',
  breadcrumbs: [
    { label: 'schoolPeriods.index', href: routes.schoolPeriods.index },
  ],
};

export default schoolPeriodsPageOptions;
