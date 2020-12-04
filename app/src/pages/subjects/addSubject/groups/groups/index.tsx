import React from 'react';

import { useApolloClient } from '@apollo/client';
import { Query } from 'material-table';

import SUBJECTS_ADD_SUBJECT_GROUP_QUERY from 'pages/subjects/addSubject/queries/groups';

import {
  SubjectsAddSubjectGroupQuery,
  SubjectsAddSubjectGroupQueryVariables,
} from 'types/graphql';

import usePagination from 'components/usePagination';

import GroupTable from '../groupTable';
import { Group, Groups, OnGetGroupReturn } from '../types';

const GroupsIndex: React.FC = () => {
  const client = useApolloClient();

  const { getPagination, setPagination } = usePagination();

  const getGroupsHandler = (query: Query<Group>): OnGetGroupReturn => {
    return client
      .query<
        SubjectsAddSubjectGroupQuery,
        SubjectsAddSubjectGroupQueryVariables
      >({
        query: SUBJECTS_ADD_SUBJECT_GROUP_QUERY,
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

  return <GroupTable onGetGroups={getGroupsHandler} />;
};

export default GroupsIndex;
