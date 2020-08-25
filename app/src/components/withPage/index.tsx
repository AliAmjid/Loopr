import React from 'react';

import withNamespaces from 'lib/i18n/withNamespaces';

import withPageNamespaces from 'components/withPage/namespaces';
import { PageOptions } from 'components/withPage/types';
import WithPageInternal from 'components/withPage/withPage';

const withPage = <ComponentProps extends {}>(pageOptions: PageOptions) => (
  Component: React.ComponentType<ComponentProps>,
) => {
  const { namespaces, ...rest } = pageOptions;

  const EndComponent = (props: ComponentProps): JSX.Element => {
    return (
      <WithPageInternal
        {...rest}
        Component={Component}
        componentProps={props}
      />
    );
  };

  const pageNamespaces = namespaces || [];

  return withNamespaces([...withPageNamespaces, ...pageNamespaces])(
    EndComponent,
  );
};

export default withPage;
