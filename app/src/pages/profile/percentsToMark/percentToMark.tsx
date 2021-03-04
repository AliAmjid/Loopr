import React, { useState } from 'react';

import { Button, Typography } from '@material-ui/core';

import PercentsToMarkComponent from 'components/PercentsToMark';
import {
  PercentsErrors,
  PercentsValues,
} from 'components/PercentsToMark/types';

import { PercentsToMarkProps } from './types';

const PercentsToMark: React.FC<PercentsToMarkProps> = props => {
  const [percents, setPercents] = useState<{
    percents: PercentsValues;
    errors: PercentsErrors;
  }>({
    percents: {
      one: props.defaultPercents.one,
      two: props.defaultPercents.two,
      three: props.defaultPercents.three,
      four: props.defaultPercents.four,
    },
    errors: {
      one: false,
      two: false,
      three: false,
      four: false,
    },
  });

  return (
    <>
      <Typography>
        Tyto kritéria převodu se zkopírují do každého nově vytvořeného předmětu,
        který vyučujete. V každém předmětu lze převod dále individuálně upravit
      </Typography>
      <PercentsToMarkComponent
        percents={percents.percents}
        onPercentsChange={setPercents}
      />
      <Button color="primary">Reset</Button>
      <Button color="primary" variant="contained">
        Save
      </Button>
    </>
  );
};

export default PercentsToMark;
