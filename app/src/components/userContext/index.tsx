import React, { createContext, useState } from 'react';

import { User, UserContext } from './types';

const userContext = createContext<UserContext>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  set: () => {},
  value: undefined,
});

export const UserContextProvider: React.FC = props => {
  const [user, setUser] = useState<User | undefined>(undefined);

  return (
    <userContext.Provider
      value={{ set: (user: User) => setUser(user), value: user }}
    >
      {props.children}
    </userContext.Provider>
  );
};

export default userContext;
