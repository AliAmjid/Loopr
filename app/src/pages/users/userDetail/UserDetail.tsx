import React from 'react';

import { Paper } from '@material-ui/core';

import OverlayLoading from 'components/OverlayLoading';
import OverlayLoadingContainer from 'components/OverlayLoading/OverlayLoadingContainer';
import Tabs from 'components/Tabs';

import GeneralInformation from './generalInformation';
import Header from './header';
import { UserDetailProps } from './types';

const UserDetail: React.FC<UserDetailProps> = props => {
  console.log('props1', props);

  return (
    <OverlayLoadingContainer>
      <OverlayLoading loading={props.loading} />
      <Paper>
        <Header />
        <Tabs
          tabs={[
            {
              id: 0,
              label: 'Osobní informace',
              Panel: <GeneralInformation user={props.user} />,
            },
          ]}
        />
      </Paper>
    </OverlayLoadingContainer>
  );
};

export default UserDetail;
