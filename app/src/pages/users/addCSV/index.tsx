import React from 'react';

import { Paper } from '@material-ui/core';

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

  return (
    <Paper>
      <Stepper
        steps={[
          {
            index: 0,
            label: 'Upload',
            Component: <CSVUpload />,
            nextActive: uploadCSVNext,
          },
          {
            index: 1,
            label: 'Select',
            Component: <FieldSelect />,
            nextActive: fieldSelectNext,
          },
          {
            index: 2,
            label: 'Finish',
            Component: <UserUploadIndex />,
            nextActive: true,
          },
        ]}
      />
    </Paper>
  );
};
export default withPage(addCSVPageOptions)(AddCSVIndex);
