import React, { useState } from 'react';

import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-boost';
import { persistCache } from 'apollo-cache-persist';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-fetch';

const withApollo = <ComponentProps extends {} = any>(
  Component: React.FC<ComponentProps>,
) => (props: ComponentProps): JSX.Element => {
  const cache = new InMemoryCache();

  const newClient = (): ApolloClient<{}> => {
    return new ApolloClient({
      link: createHttpLink({
        uri: 'https://smeny.krystof-rezac.cz/graphql',
        fetch,
      }),
      cache,
    });
  };

  const [updated, setUpdated] = useState(false);
  const [client, setClient] = useState(newClient());

  if (process.browser && !updated) {
    setUpdated(true);
    persistCache({
      cache,
      // TODO fix
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      storage: window.localStorage,
      debug: true,
    }).then(() => setClient(newClient()));
  }

  return (
    <ApolloProvider client={client}>
      <Component {...props} />
    </ApolloProvider>
  );
};

export default withApollo;
