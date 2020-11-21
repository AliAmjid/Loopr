import React, { useState } from 'react';

import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { CachePersistor } from 'apollo-cache-persist';
import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';
import { getDisplayName } from 'recompose';

import config from 'config';

import { cachePersistorContext } from './useCachePersistor';

const withApollo = <ComponentProps extends {} = any>(
  Component: React.ComponentType<ComponentProps>,
): React.FC<ComponentProps> => props => {
  const cache = new InMemoryCache({
    dataIdFromObject(responseObject: any) {
      if (responseObject.id !== undefined) {
        return responseObject.id;
      }

      return false;
    },
  });

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
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'cache-and-network',
        },
        query: {
          fetchPolicy: 'no-cache',
        },
        mutate: {
          fetchPolicy: 'no-cache',
        },
      },
    });
  };

  const [updated, setUpdated] = useState(false);
  const [client, setClient] = useState<ApolloClient<any> | undefined>(
    undefined,
  );

  const cachePersistor: CachePersistor<any> = process.browser
    ? new CachePersistor({
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        cache,
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        storage: window.localStorage,
        debug: !config.production,
      })
    : ({} as CachePersistor<any>);

  if (process.browser && !updated) {
    setUpdated(true);
    cachePersistor.restore().then(() => setClient(newClient()));
  }
  if (!client) return <>Loading</>;

  Component.displayName = `${getDisplayName(Component)}-withApollo`;

  return (
    <ApolloProvider client={client}>
      <cachePersistorContext.Provider value={cachePersistor}>
        <Component {...props} />
      </cachePersistorContext.Provider>
    </ApolloProvider>
  );
};

export default withApollo;
