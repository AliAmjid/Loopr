import React from 'react';

import AddDialog from './addDialog';
import { AddDialogIndexProps, SubmitValues } from './types';

const AddDialogIndex: React.FC<AddDialogIndexProps> = props => {
  const submitHandler = (values: SubmitValues): void => {
    props.onClose();
  };

  return (
    <AddDialog
      open={props.open}
      onSubmit={submitHandler}
      onCancel={props.onClose}
    />
  );
};

export default AddDialogIndex;
