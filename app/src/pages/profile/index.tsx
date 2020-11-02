import React from 'react';

import { useQuery } from '@apollo/client';

import { ProfileUserQuery } from 'types/graphql';

import withPage from 'components/withPage';

import PROFILE_USER_QUERY from './queries/meUser';
import profilePageOptions from './pageOptions';
import Profile from './Profile';

const ProfileIndex: React.FC = () => {
  const { data: userData, loading: userLoading } = useQuery<ProfileUserQuery>(
    PROFILE_USER_QUERY,
  );

  return <Profile user={userData?.meUser} loading={userLoading} />;
};

export default withPage(profilePageOptions)(ProfileIndex);
