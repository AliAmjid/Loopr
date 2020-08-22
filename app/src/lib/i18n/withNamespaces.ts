import { NextPage } from 'next';
import { getDisplayName } from 'recompose';

/*
 * Can't be placed inside another HOC, needs to be first
 */
const withNamespaces = <ComponentProps extends {} = any>(
  namespaces: string[],
) => (Component: NextPage<ComponentProps>): NextPage<ComponentProps> => {
  Component.getInitialProps = async () =>
    ({ namespacesRequired: namespaces } as any);
  Component.displayName = `${getDisplayName(Component)}-withNamespaces`;

  return Component;
};

export default withNamespaces;
