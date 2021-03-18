import React from 'react';

import { Paper } from '@material-ui/core';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import OverlayLoading from 'components/OverlayLoading';
import OverlayLoadingContainer from 'components/OverlayLoading/OverlayLoadingContainer';
import ProfileHeader from 'components/ProfileHeader';
import Tabs from 'components/Tabs';

import GeneralInformation from './generalInformation';
import SystemSettingsIndex from './systemSettings';
import { UserDetailProps } from './types';

const UserDetail: React.FC<UserDetailProps> = props => {
  const { t } = useTranslation(namespaces.pages.users.userDetail);

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
              label: t('personalInformation'),
              panel: (
                <GeneralInformation user={props.user} roles={props.roles} />
              ),
            },
            {
              id: 1,
              label: t('systemSettings'),
              panel: <SystemSettingsIndex user={props.user} />,
            },
          ]}
        />
      </Paper>
    </OverlayLoadingContainer>
  );
};

export default UserDetail;
