import React from 'react';

import { Paper } from '@material-ui/core';

import OverlayLoading from 'components/OverlayLoading';
import OverlayLoadingContainer from 'components/OverlayLoading/OverlayLoadingContainer';
import ProfileHeader from 'components/ProfileHeader';
import Tabs from 'components/Tabs';

import GeneralInformation from './generalInformation';
import { UserDetailProps } from './types';

const UserDetail: React.FC<UserDetailProps> = props => {
  return (
    <OverlayLoadingContainer>
      <OverlayLoading loading={props.loading} />
      <Paper>
        <ProfileHeader
          firstname={props.user?.firstname}
          lastname={props.user?.lastname}
          roleName={props.user?.role?.name}
        />
        <Tabs
          tabs={[
            {
              id: 0,
              label: 'Personal information',
              panel: (
                <GeneralInformation user={props.user} roles={props.roles} />
              ),
            },
          ]}
        />
      </Paper>
    </OverlayLoadingContainer>
  );
};

export default UserDetail;
