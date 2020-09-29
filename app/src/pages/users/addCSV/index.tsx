import React from 'react';

import { Paper } from '@material-ui/core';

import Stepper from 'components/Stepper';
import withPage from 'components/withPage';

import Upload from './upload/upload';
import FieldSelect from './fieldSelect';
import addCSVPageOptions from './pageOptions';
import useAddCSVState from './state';

const AddCSVIndex: React.FC = () => {
  const { uploadNext } = useAddCSVState(state => ({
    uploadNext: state.uploadNext,
  }));

  return (
    <Paper>
      <Stepper
        steps={[
          {
            index: 0,
            label: 'Upload',
            Component: <Upload />,
            nextActive: uploadNext,
          },
          {
            index: 1,
            label: 'Select',
            Component: <FieldSelect />,
            nextActive: true,
          },
        ]}
      />
    </Paper>
  );
};
export default withPage(addCSVPageOptions)(AddCSVIndex);
