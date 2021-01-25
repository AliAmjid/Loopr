import React, { useContext, useEffect, useState } from 'react';

import { useQuery } from '@apollo/client';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

import routes from 'config/routes';

import accessContext, {
  HAS_ACCESS,
  INVALID_COOKIE,
  NO_INTERNET,
  UNAUTHORIZED,
} from 'lib/apollo/accessContext';
import withApollo from 'lib/apollo/withApollo';
import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import { WithPageMeUserQuery } from 'types/graphql';

import hasAccess from 'components/hasAccess';
import userContext from 'components/userContext';

import { User } from './Page/types';
import WITH_PAGE_ME_USER_QUERY from './queries/meUser';
import Page from './Page';
import { WithPageInternalProps } from './types';
import Unauthorized from './Unauthorized';

const WithPageInternal: React.FC<WithPageInternalProps> = props => {
  const { data } = useQuery<WithPageMeUserQuery>(WITH_PAGE_ME_USER_QUERY, {
    fetchPolicy: 'cache-and-network',
    pollInterval: 1000 * 60,
  });

  const { t } = useTranslation(namespaces.components.withPage);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const access = useContext(accessContext);
  const contextUser = useContext(userContext);

  useEffect(() => {
    access.set(HAS_ACCESS);
  }, []);

  useEffect(() => {
    if (data?.meUser) {
      contextUser.set(data.meUser);
    }
  }, [data]);

  const unauthorized =
    data &&
    !hasAccess({
      requiredResources: props.resources,
      role: data?.meUser?.role,
    });

  const logOutHandler = async (): Promise<void> => {
    cookie.remove(`${process.env.NEXT_PUBLIC_TOKEN_COOKIE}`);
    setTimeout(() => {
      router.push(routes.login.index).then(() => {
        enqueueSnackbar(t('logOutSuccess'), { variant: 'success' });
      });
    });
  };

  if (
    unauthorized ||
    access.value === INVALID_COOKIE ||
    access.value === UNAUTHORIZED ||
    access.value === NO_INTERNET
  ) {
    return <Unauthorized />;
  }

  const { componentProps, ...rest } = props;

  const user: User = {
    firstname: '',
    lastname: '',
    role: undefined,
    ...(contextUser.value || {}),
    notifications: [],
  };
  contextUser?.value?.notifications?.edges?.forEach(edge => {
    const node = edge?.node;
    if (node) {
      user.notifications.push({ ...node });
    }
  });

  return (
    <>
      <Page onLogOut={logOutHandler} {...rest} user={user}>
        <props.Component {...componentProps} />
      </Page>
    </>
  );
};

export default withApollo(WithPageInternal);
