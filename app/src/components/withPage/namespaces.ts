import namespaces from 'lib/i18n/namespaces';

import languageSelectNamespaces from 'components/LanguageSelect/namespaces';
import notificationsNamespaces from 'components/Notifications/namespaces';

const withPageNamespaces = [
  namespaces.components.withPage,
  namespaces.other.pages,
  ...notificationsNamespaces,
  ...languageSelectNamespaces,
];

export default withPageNamespaces;
