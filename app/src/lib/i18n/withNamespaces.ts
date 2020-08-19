import { NextPage } from 'next';

/*
 * Can't be placed inside another HOC, needs to be first
 */
const withNamespaces = <ComponentProps extends {} = any>(
  namespaces: string[],
) => (Component: NextPage<ComponentProps>): NextPage<ComponentProps> => {
  Component.getInitialProps = async () =>
    ({ namespacesRequired: namespaces } as any);

  return Component;
};

export default withNamespaces;
