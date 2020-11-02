import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';

import recognizeError from 'lib/apollo/recognizeError';

import { SubmitValues } from 'pages/profile/login/types';

import {
  ProfileChangePassword,
  ProfileChangePasswordVariables,
} from 'types/graphql';

import PROFILE_CHANGE_PASSWORD from '../mutations/changePassword';

import Login from './Login';

const LoginIndex: React.FC = () => {
  const [
    changePassword,
    { loading: changePasswordLoading, error: changePasswordError },
  ] = useMutation<ProfileChangePassword, ProfileChangePasswordVariables>(
    PROFILE_CHANGE_PASSWORD,
  );
  const [notMatch, setNotMatch] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const submitHandler = (values: SubmitValues): void => {
    if (values.newPassword1 !== values.newPassword2) {
      setNotMatch(true);
    } else {
      changePassword({
        variables: {
          input: {
            oldPassword: values.oldPassword,
            newPassword: values.newPassword1,
          },
        },
      })
        .then(() => {
          enqueueSnackbar('S', { variant: 'success' });
        })
        .catch(() => {
          enqueueSnackbar('E', { variant: 'error' });
        });
    }
  };

  return (
    <Login
      onSubmit={submitHandler}
      loading={changePasswordLoading}
      notMatch={notMatch}
    />
  );
};

export default LoginIndex;
