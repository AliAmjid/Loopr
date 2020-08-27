import React from 'react';

import { useApolloClient, useQuery } from '@apollo/client';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

import config from 'config';
import routes from 'config/routes';

import recognizeError from 'lib/apollo/recognizeError';
import errors from 'lib/apollo/recognizeError/errors';
import useCachePersistor from 'lib/apollo/useCachePersistor';
import withApollo from 'lib/apollo/withApollo';

import { WithPageMeUserQuery } from 'types/graphql';

import WITH_PAGE_ME_USER_QUERY from './queries/meUser';
import Page from './Page';
import { WithPageInternalProps } from './types';
import Unauthorized from './Unauthorized';

const WithPageInternal: React.FC<WithPageInternalProps> = props => {
  const { error } = useQuery<WithPageMeUserQuery>(WITH_PAGE_ME_USER_QUERY, {
    fetchPolicy: 'cache-and-network',
    pollInterval: 1000 * 60,
  });
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const apolloClient = useApolloClient();
  const cachePersistor = useCachePersistor();

  const logOutHandler = async (): Promise<void> => {
    cookie.remove(config.tokenCookie);
    await cachePersistor.purge();
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    await apolloClient.resetStore().catch(() => {});
    await router.push(routes.login.index);
    enqueueSnackbar('Uživatel úspěšně odhlášen', { variant: 'success' });
  };

  if (error && recognizeError(error) !== errors.network.failedToFetch) {
    return <Unauthorized />;
  }

  const { componentProps, ...rest } = props;

  return (
    <>
      <Page onLogOut={logOutHandler} {...rest}>
        <props.Component {...componentProps} />
      </Page>
    </>
  );
};

export default withApollo(WithPageInternal);
