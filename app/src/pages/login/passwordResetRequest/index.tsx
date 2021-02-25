import React from 'react';

import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { compose } from 'recompose';

import routes from 'config/routes';

import withApollo from 'lib/apollo/withApollo';
import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';
import withNamespaces from 'lib/i18n/withNamespaces';

import {
  LoginPasswordResetRequestApplyPasswordResetUsetMutation,
  LoginPasswordResetRequestApplyPasswordResetUsetMutationVariables,
} from 'types/graphql';

import LOGIN_PASSWORD_RESET_REQUEST_APPLY_PASSWORD_RESET_USER_MUTATION from './mutations/applyPasswordResetUser';
import PasswordResetRequest from './passwordResetRequest';

const PasswordResetRequestIndex: React.FC = () => {
  const [applyPasswordResetUser] = useMutation<
    LoginPasswordResetRequestApplyPasswordResetUsetMutation,
    LoginPasswordResetRequestApplyPasswordResetUsetMutationVariables
  >(LOGIN_PASSWORD_RESET_REQUEST_APPLY_PASSWORD_RESET_USER_MUTATION);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { t } = useTranslation(namespaces.pages.login.passwordResetRequest);

  const submitHandler = (email: string): Promise<boolean> => {
    return applyPasswordResetUser({ variables: { email } })
      .then(() => {
        enqueueSnackbar(t('applyPasswordResetUser'), { variant: 'success' });

        router.push(routes.login.index);

        return true;
      })
      .catch(() => false);
  };

  return <PasswordResetRequest onSubmit={submitHandler} />;
};

export default compose(
  withNamespaces([namespaces.pages.login.passwordResetRequest]),
  withApollo,
)(PasswordResetRequestIndex);
