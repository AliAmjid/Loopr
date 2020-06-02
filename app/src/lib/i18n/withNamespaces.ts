import { NextPage } from 'next';

/*
 * Can't be placed inside another HOC, needs to be first
 */
const withNamespaces = <ComponentProps extends {} = any>(
  Component: NextPage<ComponentProps>,
  namespaces: string[],
): NextPage<ComponentProps> => {
  Component.getInitialProps = async () =>
    ({ namespacesRequired: namespaces } as any);

  return Component;
};

export default withNamespaces;
