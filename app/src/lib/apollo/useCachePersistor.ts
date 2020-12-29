import React from 'react';

import { CachePersistor } from 'apollo-cache-persist';

export const cachePersistorContext = React.createContext(
  {} as CachePersistor<any>,
);

const useCachePersistor = (): CachePersistor<any> => {
  return React.useContext(cachePersistorContext);
};

export default useCachePersistor;
