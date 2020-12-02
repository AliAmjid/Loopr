import React, { useEffect, useState } from 'react';

import { useApolloClient, useMutation } from '@apollo/client';
import { Query } from 'material-table';

import {
  ClassesClassQuery,
  ClassesClassQueryVariables,
  ClassesUpdateClassMutation,
  ClassesUpdateClassMutationVariables,
  ClassesUsersQuery,
  ClassesUsersQueryVariables,
} from 'types/graphql';

import usePagination from 'components/usePagination';

import CLASSES_UPDATE_CLASS_MUTATION from '../mutations/updateClass';
import CLASSES_CLASS_QUERY from '../queries/class';
import CLASSES_USERS_QUERY from '../queries/users';
import useClassesState from '../state';

import ClassC from './class';
import { DetailClassUser, GetUsersReturn, SelectionChangeArgs } from './types';

const ClassIndex: React.FC = () => {
  const { selectedClass } = useClassesState(state => ({
    selectedClass: state.selectedClass,
  }));
  const client = useApolloClient();
  const [updateClass] = useMutation<
    ClassesUpdateClassMutation,
    ClassesUpdateClassMutationVariables
  >(CLASSES_UPDATE_CLASS_MUTATION);
  const {
    getPagination: getClassPagination,
    setPagination: setClassPagination,
    resetPagination: resetClassPagination,
  } = usePagination();
  const {
    getPagination: getUserPagination,
    setPagination: setUserPagination,
    resetPagination: resetUserPagination,
  } = usePagination();
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    resetClassPagination();
    resetUserPagination();
  }, [selectedClass]);

  const getClassUsers = (
    query: Query<DetailClassUser>,
  ): Promise<GetUsersReturn> => {
    const variables = getClassPagination({
      page: query.page,
      pageSize: query.pageSize,
    });

    const defaultValue = { users: [], totalCount: 0 };

    if (selectedClass) {
      return client
        .query<ClassesClassQuery, ClassesClassQueryVariables>({
          query: CLASSES_CLASS_QUERY,
          variables: {
            id: selectedClass,
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
            setClassPagination({ edges, totalCount });

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

  const getUsers = (query: Query<DetailClassUser>): Promise<GetUsersReturn> => {
    const variables = getUserPagination({
      page: query.page,
      pageSize: query.pageSize,
    });

    const defaultValue = { users: [], totalCount: 0 };

    if (selectedClass) {
      return client
        .query<ClassesUsersQuery, ClassesUsersQueryVariables>({
          query: CLASSES_USERS_QUERY,
          variables,
        })
        .then(res => {
          const edges = res.data?.users?.edges;
          const totalCount = res.data?.users?.totalCount;
          if (edges && totalCount) {
            setUserPagination({ edges, totalCount });

            const users: DetailClassUser[] = [];
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
    if (selectedClass) {
      return updateClass({
        variables: { input: { id: selectedClass, users: selected } },
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
    <ClassC
      selectedClass={selectedClass}
      getUsers={getUsers}
      getClassUsers={getClassUsers}
      onSelectionChange={selectionChangeHandler}
      onSubmit={submitHandler}
    />
  );
};

export default ClassIndex;
