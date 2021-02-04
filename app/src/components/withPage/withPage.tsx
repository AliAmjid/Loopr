import React, { useContext, useEffect, useState } from 'react';

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

import {
  WithPageMeUserQuery,
  WithPageNotificationsQuery,
  WithPageNotificationsQuery_meUser_notifications_edges,
  WithPageNotificationsQueryVariables,
} from 'types/graphql';

import hasAccess from 'components/hasAccess';
import usePagination from 'components/usePagination';
import userContext from 'components/userContext';
import WITH_PAGE_NOTIFICATIONS_QUERY from 'components/withPage/queries/notifications';

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
  const client = useApolloClient();
  const { getPagination, setPagination } = usePagination();
  const [notificationsPage, setNotificationsPage] = useState(0);
  const [notifications, setNotifications] = useState<
    (WithPageNotificationsQuery_meUser_notifications_edges | null)[]
  >([]);

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
      contextUser.set({
        ...data.meUser,
        notifications: { edges: notifications },
      });
    }
  }, [data, notifications]);

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
    access.value === UNAUTHORIZED
  ) {
    return <Unauthorized />;
  }

  const fetchMoreNotificationsHandler = (): void => {
    const paginationVariables = getPagination({
      page: notificationsPage,
      pageSize: 10,
    });
    client
      .query<WithPageNotificationsQuery, WithPageNotificationsQueryVariables>({
        query: WITH_PAGE_NOTIFICATIONS_QUERY,
        variables: { ...paginationVariables },
      })
      .then(res => {
        const totalCount = res.data?.meUser?.notifications?.totalCount;
        const edges = res.data?.meUser?.notifications?.edges;
        if (totalCount && edges) {
          setPagination({ edges, totalCount });
          setNotificationsPage(notificationsPage + 1);
          setNotifications([...notifications, ...edges]);
        }
      });
  };

  useEffect(() => {
    fetchMoreNotificationsHandler();
  }, []);

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
      <Page
        onLogOut={logOutHandler}
        {...rest}
        user={user}
        onFetchMoreNotifications={fetchMoreNotificationsHandler}
      >
        <props.Component {...componentProps} />
      </Page>
    </>
  );
};

export default withApollo(WithPageInternal);
