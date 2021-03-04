import React from 'react';

import { Paper } from '@material-ui/core';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import OverlayLoading from 'components/OverlayLoading';
import OverlayLoadingContainer from 'components/OverlayLoading/OverlayLoadingContainer';
import ProfileHeader from 'components/ProfileHeader';
import Tabs from 'components/Tabs';

import GeneralInformation from './generalInformation';
import LoginIndex from './login';
import PercentsToMarkIndex from './percentsToMark';
import { ProfileProps } from './types';

const Profile: React.FC<ProfileProps> = props => {
  const { t } = useTranslation(namespaces.pages.profile.index);

  return (
    <Paper>
      <OverlayLoadingContainer>
        <OverlayLoading loading={props.loading} />
        <ProfileHeader
          firstname={props.user?.firstname}
          lastname={props.user?.lastname}
          roleName={props.user?.role.name}
        />
        <Tabs
          tabs={[
            {
              id: 0,
              label: t('generalInformation'),
              panel: <GeneralInformation user={props.user} />,
            },
            { id: 1, label: t('login'), panel: <LoginIndex /> },
            {
              id: 2,
              label: t('percentsToMark'),
              panel: (
                <PercentsToMarkIndex
                  percents={props.user?.privateData?.defaultPercentToMark}
                />
              ),
            },
          ]}
        />
      </OverlayLoadingContainer>
    </Paper>
  );
};

export default Profile;
