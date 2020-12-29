import routes from 'config/routes';

import namespaces from 'lib/i18n/namespaces';

import { Breadcrumbs } from 'components/withPage/Page/AppBar/Breadcrumbs/types';
import { PageOptions } from 'components/withPage/types';

const profileBreadcrumbs: Breadcrumbs = [
  { label: 'profile.index', href: routes.profile.index },
];

const profileNamespaces = [namespaces.pages.profile.index];

const profilePageOptions: PageOptions = {
  breadcrumbs: profileBreadcrumbs,
  namespaces: profileNamespaces,
  title: 'profile.index',
};

export default profilePageOptions;
