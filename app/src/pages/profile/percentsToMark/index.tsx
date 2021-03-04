import React from 'react';

import PercentsToMark from './percentToMark';
import { PercentsToMarkIndexProps } from './types';

const PercentsToMarkIndex: React.FC<PercentsToMarkIndexProps> = props => {
  return (
    <PercentsToMark
      defaultPercents={{
        one: `${props.percents?.one || ''}`,
        two: `${props.percents?.two || ''}`,
        three: `${props.percents?.three || ''}`,
        four: `${props.percents?.four || ''}`,
      }}
    />
  );
};

export default PercentsToMarkIndex;
