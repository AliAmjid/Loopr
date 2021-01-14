import React from 'react';

import namespaces from 'lib/i18n/namespaces';
import withNamespaces from 'lib/i18n/withNamespaces';

import withPageNamespaces from 'components/withPage/namespaces';
import { PageOptions } from 'components/withPage/types';
import WithPageInternal from 'components/withPage/withPage';

const withPage = <ComponentProps extends {}>(pageOptions: PageOptions) => (
  Component: React.ComponentType<ComponentProps>,
) => {
  const { namespaces: pageNamespaces, ...rest } = pageOptions;

  const EndComponent: React.FC<ComponentProps> = props => {
    return (
      <WithPageInternal
        {...rest}
        Component={Component}
        componentProps={props}
      />
    );
  };

  return withNamespaces([
    'common',
    namespaces.lib.dayjs,
    ...withPageNamespaces,
    ...(pageNamespaces || []),
  ])(EndComponent);
};

export default withPage;
