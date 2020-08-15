import React, { useState } from 'react';

import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { persistCache } from 'apollo-cache-persist';
import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';

import config from 'config';

const withApollo = <ComponentProps extends {} = any>(
  Component: React.ComponentType<ComponentProps>,
) => (props: ComponentProps): JSX.Element => {
  const cache = new InMemoryCache();

  const newClient = (): ApolloClient<any> => {
    const httpLink = createHttpLink({
      uri: config.apiURL,
      fetch,
    });

    const authLink = setContext((_, { headers }) => {
      const token = cookie.get(config.tokenCookie);

      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
        },
      };
    });

    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache,
    });
  };

  const [updated, setUpdated] = useState(false);
  const [client, setClient] = useState(newClient());

  if (process.browser && !updated) {
    setUpdated(true);
    persistCache({
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      cache,
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      storage: window.localStorage,
      debug: !config.production,
    }).then(() => setClient(newClient()));
  }

  return (
    <ApolloProvider client={client}>
      <Component {...props} />
    </ApolloProvider>
  );
};

export default withApollo;
