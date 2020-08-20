import React from 'react';

import WithPageInternal from 'components/withPage/withPage';

const withPage = <ComponentProps extends {}>() => (
  Component: React.ComponentType<ComponentProps>,
) => (props: ComponentProps) => {
  return <WithPageInternal Component={Component} componentProps={props} />;
};

export default withPage;
