const stripRolePrefix = (roleName: string): string => {
  const prefix = 'ROLE_';

  return roleName.slice(prefix.length);
};

export default stripRolePrefix;
