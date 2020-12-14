import React from 'react';

import { useApolloClient } from '@apollo/client';
import { Query } from 'material-table';

import {
  SubjectsAddSubjectGroupQuery,
  SubjectsAddSubjectGroupQueryVariables,
} from 'types/graphql';

import usePagination from 'components/usePagination';

import SUBJECTS_EDIT_SUBJECT_GROUP_QUERY from '../../queries/groups';
import useEditSubjectState from '../../state';
import GroupTable from '../groupTable';
import { Group, Groups, OnGetGroupsReturn } from '../types';

const GroupsIndex: React.FC = () => {
  const { group, setGroup } = useEditSubjectState(state => ({
    group: state.group,
    setGroup: state.setGroup,
  }));

  const client = useApolloClient();

  const { getPagination, setPagination } = usePagination();

  const getGroupsHandler = (query: Query<Group>): OnGetGroupsReturn => {
    return client
      .query<
        SubjectsAddSubjectGroupQuery,
        SubjectsAddSubjectGroupQueryVariables
      >({
        query: SUBJECTS_EDIT_SUBJECT_GROUP_QUERY,
        variables: {
          ...getPagination({ page: query.page, pageSize: query.pageSize }),
        },
      })
      .then(res => {
        const edges = res.data?.groups?.edges;
        const totalCount = res.data?.groups?.totalCount;
        if (edges && totalCount) {
          setPagination({
            edges,
            totalCount,
          });

          const groups: Groups = [];
          edges?.forEach(group => {
            if (group?.node) {
              groups.push(group.node);
            }
          });

          return { totalCount, groups };
        }

        return { totalCount: 0, groups: [] };
      });
  };

  return (
    <GroupTable
      selectedGroup={group}
      onSelectedGroupChange={(group: string) => setGroup(group)}
      onGetGroups={getGroupsHandler}
    />
  );
};

export default GroupsIndex;
