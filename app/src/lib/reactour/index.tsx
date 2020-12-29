import React from 'react';

import { ReactourContextProps } from 'lib/reactour/types';

import reactourContext from './context';

const useTour = (): ReactourContextProps => {
  return React.useContext(reactourContext);
};

export default useTour;
