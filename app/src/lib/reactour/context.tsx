import { createContext } from 'react';

import { ReactourContextProps } from 'lib/reactour/types';

const reactourContext = createContext({} as ReactourContextProps);
export default reactourContext;
export const ReactourProvider = reactourContext.Provider;
