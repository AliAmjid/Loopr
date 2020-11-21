import { HasAccessProps } from 'components/hasAccess/types';

const hasAccess = ({ requiredResources, role }: HasAccessProps): boolean => {
  const resources = role?.resources?.map(resource => resource?.name);

  let access = false;

  requiredResources.forEach(resourceBlock => {
    if (
      !resourceBlock?.some(
        requiredResource =>
          !resources?.some(resource => resource === requiredResource),
      )
    ) {
      access = true;
    }
  });

  return access;
};

export default hasAccess;
