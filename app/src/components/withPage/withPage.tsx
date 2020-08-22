import React from 'react';

import { useApolloClient, useQuery } from '@apollo/client';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

import config from 'config';
import routes from 'config/routes';

import useCachePersistor from 'lib/apollo/useCachePersistor';
import withApollo from 'lib/apollo/withApollo';

import meUserQuery, { MeUserQuery } from './meUser.query';
import Page from './Page';
import { WithPageInternalProps } from './types';
import Unauthorized from './Unauthorized';

const WithPageInternal = (props: WithPageInternalProps): JSX.Element => {
  const { error, loading } = useQuery<MeUserQuery>(meUserQuery, {
    fetchPolicy: 'cache-and-network',
    pollInterval: 1000 * 60,
  });
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const apolloClient = useApolloClient();
  const cachePersistor = useCachePersistor();

  const logOutHandler = async (): Promise<void> => {
    cookie.remove(config.tokenCookie);
    await apolloClient.resetStore();
    await cachePersistor.purge();
    await router.push(routes.login.index);
    enqueueSnackbar('Uživatel úspěšně odhlášen', { variant: 'success' });
  };

  if (error) {
    return <Unauthorized />;
  }

  return (
    <>
      <Page onLogOut={logOutHandler}>
        <props.Component {...props.componentProps} />
      </Page>
    </>
  );
};

export default withApollo(WithPageInternal);
