const addRolePrefix = (roleName: string): string => {
  return `ROLE_${roleName}`;
};

export default addRolePrefix;
