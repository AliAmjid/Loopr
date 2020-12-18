import React, { useState } from 'react';

import { useApolloClient } from '@apollo/client';
import { Query } from 'material-table';
import { Simulate } from 'react-dom/test-utils';

import {
  ClassGroupsClassGroupUsersQuery,
  ClassGroupsClassGroupUsersQueryVariables,
  ClassGroupsUsersQuery,
  ClassGroupsUsersQueryVariables,
} from 'types/graphql';

import usePagination from 'components/usePagination';

import CLASS_GROUPS_CLASS_GROUP_USERS_QUERY from '../../queries/classGroupUsers';
import CLASS_GROUPS_USERS_QUERY from '../../queries/users';
import useClassGroupsState from '../../state';

import Students from './students';
import {
  ClassGroupUser,
  GetClassGroupUsersReturn,
  GetUsersReturn,
  SelectionChangeArgs,
  User,
} from './types';

const StudentsIndex: React.FC = () => {
  const { selectedClassGroup } = useClassGroupsState(state => ({
    selectedClassGroup: state.selectedClassGroup,
  }));
  const [changedUsers, setChangedUsers] = useState<
    {
      id: string;
      selected: boolean;
    }[]
  >([]);
  const {
    getPagination: getClassGroupPagination,
    setPagination: setClassGroupPagination,
  } = usePagination();
  const {
    getPagination: getUserPagination,
    setPagination: setUserPagination,
  } = usePagination();
  const client = useApolloClient();

  const getClassGroupUsersHandler = (
    query: Query<ClassGroupUser>,
  ): Promise<GetClassGroupUsersReturn> => {
    const variables = getClassGroupPagination({
      page: query.page,
      pageSize: query.pageSize,
    });

    const defaultValue = { users: [], totalCount: 0 };

    if (selectedClassGroup) {
      return client
        .query<
          ClassGroupsClassGroupUsersQuery,
          ClassGroupsClassGroupUsersQueryVariables
        >({
          query: CLASS_GROUPS_CLASS_GROUP_USERS_QUERY,
          variables: {
            id: selectedClassGroup,
            usersFirst: variables.first,
            usersLast: variables.last,
            usersBefore: variables.before,
            usersAfter: variables.after,
          },
        })
        .then(res => {
          const edges = res.data?.classGroup?.users?.edges;
          const totalCount = res.data?.classGroup?.users?.totalCount;
          if (edges && totalCount) {
            setClassGroupPagination({ edges, totalCount });

            const users = [];
            for (const user of res.data?.classGroup?.users?.edges || []) {
              if (user?.node) users.push(user.node);
            }

            return { users, totalCount };
          }

          return defaultValue;
        });
    }

    return Promise.resolve(defaultValue);
  };
  const getUsersHandler = (query: Query<User>): Promise<GetUsersReturn> => {
    const variables = getUserPagination({
      page: query.page,
      pageSize: query.pageSize,
    });

    const defaultValue = { users: [], totalCount: 0 };

    if (selectedClassGroup) {
      return client
        .query<ClassGroupsUsersQuery, ClassGroupsUsersQueryVariables>({
          query: CLASS_GROUPS_USERS_QUERY,
          variables: {
            ...variables,
            resourceName: undefined,
          },
        })
        .then(res => {
          const edges = res.data?.users?.edges;
          const totalCount = res.data?.users?.totalCount;
          if (edges && totalCount) {
            setUserPagination({ edges, totalCount });

            const users: User[] = [];
            for (const user of res.data?.users?.edges || []) {
              if (user?.node) {
                const node = user?.node;
                users.push({
                  ...node,
                  tableData: {
                    checked: node.classGroup?.id === selectedClassGroup,
                  },
                });
              }
            }

            return { users, totalCount };
          }

          return defaultValue;
        });
    }

    return Promise.resolve(defaultValue);
  };

  console.log(changedUsers);

  const selectionChangeHandler = (args: SelectionChangeArgs): void => {
    setChangedUsers(prevState => {
      const index = prevState.findIndex(
        changedUser => changedUser.id === args.id,
      );
      if (index !== -1) {
        prevState[index].selected = args.selected;
      } else {
        prevState = [...prevState, { id: args.id, selected: args.selected }];
      }

      return prevState;
    });
  };

  return (
    <Students
      onGetClassGroupUsers={getClassGroupUsersHandler}
      onGetUsers={getUsersHandler}
      onSelectionChange={selectionChangeHandler}
      onSubmit={() => {}}
    />
  );
};

export default StudentsIndex;
