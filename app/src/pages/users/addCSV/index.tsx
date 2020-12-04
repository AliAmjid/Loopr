import React from 'react';

import { Paper } from '@material-ui/core';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import UserUploadIndex from 'pages/users/addCSV/userUpload';

import Stepper from 'components/Stepper';
import withPage from 'components/withPage';

import CSVUpload from './CSVUpload/CSVUpload';
import FieldSelect from './fieldSelect';
import addCSVPageOptions from './pageOptions';
import useAddCSVState from './state';

const AddCSVIndex: React.FC = () => {
  const { uploadCSVNext, fieldSelectNext } = useAddCSVState(state => ({
    uploadCSVNext: state.uploadCSVNext,
    fieldSelectNext: state.fieldSelectNext,
  }));
  const { t } = useTranslation(namespaces.pages.users.addCSV);

  return (
    <Paper>
      <Stepper
        steps={[
          {
            index: 0,
            label: t('csv'),
            component: <CSVUpload />,
            nextActive: uploadCSVNext,
          },
          {
            index: 1,
            label: t('select'),
            component: <FieldSelect />,
            nextActive: fieldSelectNext,
          },
          {
            index: 2,
            label: t('upload'),
            component: <UserUploadIndex />,
            nextActive: true,
          },
        ]}
      />
    </Paper>
  );
};
export default withPage(addCSVPageOptions)(AddCSVIndex);
