import namespaces from 'lib/i18n/namespaces';

import helpNamespaces from 'components/Help/namespaces';
import languageSelectNamespaces from 'components/LanguageSelect/namespaces';

const loginNamespaces = [
  namespaces.pages.login.index,
  ...languageSelectNamespaces,
  ...helpNamespaces,
];

export default loginNamespaces;
