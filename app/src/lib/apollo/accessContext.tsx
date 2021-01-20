import React, { useState } from 'react';

export const HAS_ACCESS = 'hasAccess';
export const INVALID_COOKIE = 'invalidCookie';
export const UNAUTHORIZED = 'unauthorized';
export const NO_INTERNET = 'noInternet';

type AccessState =
  | typeof HAS_ACCESS
  | typeof INVALID_COOKIE
  | typeof UNAUTHORIZED
  | typeof NO_INTERNET;

export const accessContext = React.createContext<{
  set: (state: AccessState) => void;
  value: AccessState;
}>({ set: (): void => {}, value: HAS_ACCESS });

export const AccessContextProvider: React.FC = props => {
  const [access, setAccess] = useState<AccessState>(HAS_ACCESS);

  return (
    <accessContext.Provider
      value={{
        set: (state: AccessState) => {
          setAccess(state);
        },
        value: access,
      }}
    >
      {props.children}
    </accessContext.Provider>
  );
};

export default accessContext;
