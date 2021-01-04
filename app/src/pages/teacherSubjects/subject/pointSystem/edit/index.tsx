import React from 'react';

import Edit from './edit';
import { EditIndexProps } from './types';

const EditIndex: React.FC<EditIndexProps> = props => {
  return <Edit open={props.open} />;
};

export default EditIndex;
