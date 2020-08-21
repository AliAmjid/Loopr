import React from 'react';

import withNamespaces from 'lib/i18n/withNamespaces';

import withPageNamespaces from 'components/withPage/namespaces';
import { PageProps } from 'components/withPage/types';
import WithPageInternal from 'components/withPage/withPage';

const withPage = <ComponentProps extends {}>(pageProps: PageProps = {}) => (
  Component: React.ComponentType<ComponentProps>,
) => {
  const EndComponent = (props: ComponentProps): JSX.Element => {
    return <WithPageInternal Component={Component} componentProps={props} />;
  };

  const pageNamespaces = pageProps.namespaces || [];

  return withNamespaces([...withPageNamespaces, ...pageNamespaces])(
    EndComponent,
  );
};

export default withPage;
