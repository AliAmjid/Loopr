import React, { useEffect, useState } from 'react';

import { useQuery } from '@apollo/client';

import { UserImportTableAclRolesQuery } from 'types/graphql';

import stripRolePrefix from 'components/stripRolePrefix';

import USER_IMPORT_TABLE_ACL_ROLES_QUERY from './queries/roles';
import {
  RolesLookup,
  User,
  UserImportTableProps,
  Users,
  UsersWithId,
  UserWithId,
} from './types';
import UserImportTableUI from './UserImportTableUI';

const UserImportTable: React.FC<UserImportTableProps> = props => {
  const [users, setUsers] = useState<UsersWithId>([]);
  const { data: rolesData, loading: rolesLoading } = useQuery<
    UserImportTableAclRolesQuery
  >(USER_IMPORT_TABLE_ACL_ROLES_QUERY);

  useEffect(() => {
    if (props.users)
      setUsers(props.users.map((user, index) => ({ ...user, id: index })));
  }, [props.users]);

  const rolesLookup: RolesLookup = {};
  rolesData?.aclRoles?.forEach(role => {
    if (role !== null) rolesLookup[role.id] = stripRolePrefix(role.name);
  });

  const rowAddHandler = (user: User): void => {
    setUsers(prevState => [
      ...prevState,
      { ...user, id: prevState[prevState.length - 1]?.id + 1 || 0 },
    ]);
  };

  const rowUpdateHandler = (user: UserWithId): void => {
    setUsers(prevState => {
      const userIndex = prevState.findIndex(u => u.id === user.id);
      prevState[userIndex] = user;

      return [...prevState];
    });
  };

  const rowDeleteHandler = (user: UserWithId): void => {
    setUsers(prevState => {
      const userIndex = prevState.findIndex(u => u.id === user.id);
      prevState.splice(userIndex, 1);

      return [...prevState];
    });
  };

  console.log('users', users);

  return (
    <UserImportTableUI
      users={users}
      rolesLookup={rolesLookup}
      loading={rolesLoading}
      onRowAdd={rowAddHandler}
      onRowUpdate={rowUpdateHandler}
      onRowDelete={rowDeleteHandler}
    />
  );
};

export default UserImportTable;
