import routes from 'config/routes';

import namespaces from 'lib/i18n/namespaces';

import { PageOptions } from 'components/withPage/types';

const schoolPeriodsPageOptions: PageOptions = {
  title: 'schoolPeriods.index',
  breadcrumbs: [
    { label: 'schoolPeriods.index', href: routes.schoolPeriods.index },
  ],
  namespaces: [namespaces.pages.schoolPeriods.index],
};

export default schoolPeriodsPageOptions;
