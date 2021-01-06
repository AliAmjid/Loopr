import React from 'react';

import PercentsToMarkDialog from './percentsToMarkDialog';
import { PercentsToMarkDialogIndexProps, PercentsValues } from './types';

const PercentsToMarkDialogIndex: React.FC<PercentsToMarkDialogIndexProps> = props => {
  const submitHandler = (values: PercentsValues): void => {};

  return (
    <PercentsToMarkDialog
      open={props.open}
      defaultValues={props.percentsToMarkConvert}
      onSubmit={submitHandler}
    />
  );
};

export default PercentsToMarkDialogIndex;
