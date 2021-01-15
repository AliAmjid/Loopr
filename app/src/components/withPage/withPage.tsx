import React, { useContext, useEffect } from 'react';

import { useApolloClient, useQuery } from '@apollo/client';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

import routes from 'config/routes';

import accessContext, {
  HAS_ACCESS,
  INVALID_COOKIE,
  UNAUTHORIZED,
} from 'lib/apollo/accessContext';
import withApollo from 'lib/apollo/withApollo';
import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import { WithPageMeUserQuery } from 'types/graphql';

import hasAccess from 'components/hasAccess';

import WITH_PAGE_ME_USER_QUERY from './queries/meUser';
import Page from './Page';
import { WithPageInternalProps } from './types';
import Unauthorized from './Unauthorized';

const WithPageInternal: React.FC<WithPageInternalProps> = props => {
  const { data, error } = useQuery<WithPageMeUserQuery>(
    WITH_PAGE_ME_USER_QUERY,
    {
      fetchPolicy: 'cache-and-network',
      pollInterval: 1000 * 60,
    },
  );
  const { t } = useTranslation(namespaces.components.withPage);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const apolloClient = useApolloClient();
  const access = useContext(accessContext);
  const unauthorized = !hasAccess({
    requiredResources: props.resources,
    role: data?.meUser?.role,
  });

  useEffect(() => {
    access.set(HAS_ACCESS);
  }, []);

  const logOutHandler = async (): Promise<void> => {
    cookie.remove(`${process.env.NEXT_PUBLIC_TOKEN_COOKIE}`);
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    await apolloClient.resetStore().catch(() => {});
    await router.push(routes.login.index);
    enqueueSnackbar(t('logOutSuccess'), { variant: 'success' });
  };

  if (
    unauthorized ||
    access.value === INVALID_COOKIE ||
    access.value === UNAUTHORIZED
  ) {
    return <Unauthorized />;
  }

  const { componentProps, ...rest } = props;

  return (
    <>
      <Page onLogOut={logOutHandler} {...rest} user={data?.meUser}>
        <props.Component {...componentProps} />
      </Page>
    </>
  );
};

export default withApollo(WithPageInternal);
