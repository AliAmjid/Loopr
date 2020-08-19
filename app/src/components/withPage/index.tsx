import React from 'react';

import Page from 'components/withPage/Page';

const withPage = <ComponentProps extends {}>() => (
  Component: React.ComponentType<ComponentProps>,
) => (props: ComponentProps) => {
  return (
    <>
      <Page>
        <Component {...props} />
      </Page>
    </>
  );
};

export default withPage;
