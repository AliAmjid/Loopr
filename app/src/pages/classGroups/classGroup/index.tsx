import React, { useEffect, useState } from 'react';

import { useApolloClient, useMutation } from '@apollo/client';
import { Query } from 'material-table';

import {
  ClassGroupsClassGroupQuery,
  ClassGroupsClassGroupQueryVariables,
  ClassGroupsUpdateClassGroupMutation,
  ClassGroupsUpdateClassGroupMutationVariables,
  ClassGroupsUsersQuery,
  ClassGroupsUsersQueryVariables,
} from 'types/graphql';

import usePagination from 'components/usePagination';

import CLASS_GROUPS_UPDATE_CLASS_GROUP_MUTATION from '../mutations/updateClass';
import CLASS_GROUPS_CLASS_GROUP_QUERY from '../queries/class';
import CLASS_GROUPS_USERS_QUERY from '../queries/users';
import useClassGroupsState from '../state';

import ClassGroup from './classGroup';
import {
  DetailClassGroupUser,
  GetUsersReturn,
  SelectionChangeArgs,
} from './types';

const ClassIndex: React.FC = () => {
  const { selectedClassGroup } = useClassGroupsState(state => ({
    selectedClassGroup: state.selectedClassGroup,
  }));
  const client = useApolloClient();
  const [updateClass] = useMutation<
    ClassGroupsUpdateClassGroupMutation,
    ClassGroupsUpdateClassGroupMutationVariables
  >(CLASS_GROUPS_UPDATE_CLASS_GROUP_MUTATION);
  const {
    getPagination: getClassGroupPagination,
    setPagination: setClassGroupPagination,
    resetPagination: resetClassGroupPagination,
  } = usePagination();
  const {
    getPagination: getUserPagination,
    setPagination: setUserPagination,
    resetPagination: resetUserPagination,
  } = usePagination();
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    resetClassGroupPagination();
    resetUserPagination();
  }, [selectedClassGroup]);

  const getClassGroupUsers = (
    query: Query<DetailClassGroupUser>,
  ): Promise<GetUsersReturn> => {
    const variables = getClassGroupPagination({
      page: query.page,
      pageSize: query.pageSize,
    });

    const defaultValue = { users: [], totalCount: 0 };

    if (selectedClassGroup) {
      return client
        .query<ClassGroupsClassGroupQuery, ClassGroupsClassGroupQueryVariables>(
          {
            query: CLASS_GROUPS_CLASS_GROUP_QUERY,
            variables: {
              id: selectedClassGroup,
              usersFirst: variables.first,
              usersLast: variables.last,
              usersBefore: variables.before,
              usersAfter: variables.after,
            },
          },
        )
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

  const getUsers = (
    query: Query<DetailClassGroupUser>,
  ): Promise<GetUsersReturn> => {
    const variables = getUserPagination({
      page: query.page,
      pageSize: query.pageSize,
    });

    const defaultValue = { users: [], totalCount: 0 };

    if (selectedClassGroup) {
      return client
        .query<ClassGroupsUsersQuery, ClassGroupsUsersQueryVariables>({
          query: CLASS_GROUPS_USERS_QUERY,
          variables,
        })
        .then(res => {
          const edges = res.data?.users?.edges;
          const totalCount = res.data?.users?.totalCount;
          if (edges && totalCount) {
            setUserPagination({ edges, totalCount });

            const users: DetailClassGroupUser[] = [];
            for (const user of res.data?.users?.edges || []) {
              if (user?.node) {
                const node = user?.node;
                users.push({
                  ...node,
                  tableData: {
                    checked: selected.some(id => id === node.id),
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

  const selectionChangeHandler = (args: SelectionChangeArgs): void => {
    if (args.selected) {
      setSelected(prevState => [...prevState, args.id]);
    } else {
      setSelected(prevState => {
        prevState.splice(
          prevState.findIndex(s => s === args.id),
          1,
        );

        return prevState;
      });
    }
  };

  const submitHandler = (): Promise<boolean> => {
    if (selectedClassGroup) {
      return updateClass({
        variables: { input: { id: selectedClassGroup, users: selected } },
      })
        .then(() => {
          return true;
        })
        .catch(() => {
          return false;
        });
    }

    return Promise.resolve(false);
  };

  return (
    <ClassGroup
      selectedClassGroup={selectedClassGroup}
      getUsers={getUsers}
      getClassGroupUsers={getClassGroupUsers}
      onSelectionChange={selectionChangeHandler}
      onSubmit={submitHandler}
    />
  );
};

export default ClassIndex;
