import namespaces from 'lib/i18n/namespaces';

import languageSelectNamespaces from 'components/LanguageSelect/namespaces';

const withPageNamespaces = [
  namespaces.components.withPage,
  namespaces.other.pages,
  ...languageSelectNamespaces,
];

export default withPageNamespaces;
