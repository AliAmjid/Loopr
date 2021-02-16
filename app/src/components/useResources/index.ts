import { useContext } from 'react';

import hasAccess from 'components/hasAccess';
import userContext from 'components/userContext';

const useResources = (resources: string[][]): boolean => {
  const contextUser = useContext(userContext);

  return hasAccess({
    requiredResources: resources,
    role: contextUser.value?.role,
  });
};

export default useResources;
