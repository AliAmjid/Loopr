import React, { useEffect, useState } from 'react';

import { useMutation, useQuery } from '@apollo/client';
import { useSnackbar } from 'notistack';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import {
  UserImportTableAclRolesQuery,
  UserImportTableCreateUserMutation,
  UserImportTableCreateUserMutationVariables,
} from 'types/graphql';

import addRolePrefix from 'components/addRolePrefix';
import stripRolePrefix from 'components/stripRolePrefix';

import USER_IMPORT_TABLE_CREATE_USER_MUTATION from './mutations/createUser';
import USER_IMPORT_TABLE_ACL_ROLES_QUERY from './queries/roles';
import {
  RolesLookup,
  User,
  UserImportTableProps,
  UsersWithId,
  UserWithId,
} from './types';
import UserImportTableUI from './UserImportTableUI';

const UserImportTable: React.FC<UserImportTableProps> = props => {
  const [users, setUsers] = useState<UsersWithId>([]);
  const [selectedIds, setSelecteedIds] = useState<number[]>([]);
  const { data: rolesData, loading: rolesLoading } = useQuery<
    UserImportTableAclRolesQuery
  >(USER_IMPORT_TABLE_ACL_ROLES_QUERY);
  const [userCreate, { loading: userCreateLoading }] = useMutation<
    UserImportTableCreateUserMutation,
    UserImportTableCreateUserMutationVariables
  >(USER_IMPORT_TABLE_CREATE_USER_MUTATION);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation(namespaces.components.UserImportTable);

  useEffect(() => {
    if (props.users)
      setUsers(
        props.users.map((user, index) => {
          const role =
            rolesData?.aclRoles?.find(
              role => role?.name === addRolePrefix(user.role),
            )?.id || '';

          return { ...user, id: index, role };
        }),
      );
    setSelecteedIds([]);
  }, [props.users, rolesData]);

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
    setUsers(prevState => prevState.filter(u => u.id !== user.id));
  };

  const selectionChangeHandler = (users: UsersWithId): void => {
    setSelecteedIds(users.map(u => u.id));
  };

  const submitHandler = (): void => {
    let ongoingRequests = [...selectedIds];
    let failed = false;

    const responseHandler = (userId: number): void => {
      ongoingRequests = ongoingRequests.filter(id => id !== userId);
      if (ongoingRequests.length === 0) {
        if (failed) {
          enqueueSnackbar(t('error'), { variant: 'error' });
        } else {
          enqueueSnackbar(t('success'), { variant: 'success' });
        }
      }
    };

    selectedIds.forEach(userId => {
      const user = users.find(u => u.id === userId);
      if (user !== undefined) {
        userCreate({
          variables: {
            input: {
              email: user.email,
              firstname: user.firstname,
              lastname: user.lastname,
              role: user.role,
            },
          },
        })
          .then(() => {
            responseHandler(userId);
            setUsers(users => users.filter(u => u.id !== userId));
          })
          .catch(() => {
            failed = true;
            setUsers(users => {
              const userIndex = users.findIndex(u => u.id === userId);
              users[userIndex].error = true;

              return users;
            });
            responseHandler(userId);
          });
      }
    });
  };

  return (
    <UserImportTableUI
      users={users}
      rolesLookup={rolesLookup}
      loading={rolesLoading || userCreateLoading}
      onRowAdd={rowAddHandler}
      onRowUpdate={rowUpdateHandler}
      onRowDelete={rowDeleteHandler}
      onSelectionChange={selectionChangeHandler}
      onSubmit={submitHandler}
    />
  );
};

export default UserImportTable;
