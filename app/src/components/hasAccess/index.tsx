import { HasAccessProps } from 'components/hasAccess/types';

const hasAccess = ({ requiredResources, role }: HasAccessProps): boolean => {
  const resources = role?.resources?.map(resource => resource?.name);

  return !requiredResources?.some(
    requiredResource =>
      !resources?.some(resource => resource === requiredResource),
  );
};

export default hasAccess;
