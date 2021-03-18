import React from 'react';

import { useMutation } from '@apollo/client';

import USERS_USER_DETAIL_ARCHIVE_USER_MUTATION from 'pages/users/userDetail/mutations/archiveUser';

import {
  UsersUserDetailArchiveUserMutation,
  UsersUserDetailArchiveUserMutationVariables,
} from 'types/graphql';

import SystemSettings from './systemSettings';
import { SystemSettingsIndexProps } from './types';

const SystemSettingsIndex: React.FC<SystemSettingsIndexProps> = props => {
  const [archiveUser] = useMutation<
    UsersUserDetailArchiveUserMutation,
    UsersUserDetailArchiveUserMutationVariables
  >(USERS_USER_DETAIL_ARCHIVE_USER_MUTATION, {
    refetchQueries: ['UsersUserDetailUserQuery'],
    awaitRefetchQueries: true,
  });

  const archiveHandler = (archive: boolean): void => {
    archiveUser({ variables: { input: { id: props.user!.id, archive } } });
  };

  return (
    <>
      <SystemSettings user={props.user} onArchive={archiveHandler} />
    </>
  );
};

export default SystemSettingsIndex;
