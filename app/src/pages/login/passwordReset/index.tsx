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
  LoginPasswordResetResetPasswordUserMutation,
  LoginPasswordResetResetPasswordUserMutationVariables,
} from 'types/graphql';

import LOGIN_PASSWORD_RESET_RESET_PASSWORD_USER_MUTATION from './mutations/resetPasswordUser';
import PasswordReset from './passwordReset';

const PasswordResetIndex: React.FC = () => {
  const [
    resetPasswordUser,
    { loading: resetPasswordUserLoading },
  ] = useMutation<
    LoginPasswordResetResetPasswordUserMutation,
    LoginPasswordResetResetPasswordUserMutationVariables
  >(LOGIN_PASSWORD_RESET_RESET_PASSWORD_USER_MUTATION);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { t } = useTranslation(namespaces.pages.login.passwordReset);

  const submitHandler = (newPassword: string): void => {
    resetPasswordUser({
      variables: { key: `${router.query.key}`, newPassword },
    }).then(() => {
      enqueueSnackbar(t('snackbars.resetPasswordUser'), { variant: 'success' });
      router.push(routes.login.index);
    });
  };

  return (
    <PasswordReset
      loading={resetPasswordUserLoading}
      onSubmit={submitHandler}
    />
  );
};

export default compose(
  withNamespaces([namespaces.pages.login.passwordReset]),
  withApollo,
)(PasswordResetIndex);
