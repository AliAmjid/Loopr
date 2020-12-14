import React from 'react';

import AddIcon from '@material-ui/icons/Add';
import { Query } from 'material-table';

import MaterialTable from 'lib/material-table';
import useSelectedBackground from 'lib/material-table/useSelectedBackground';

import { Teacher, TeacherProps } from './types';

const Teachers: React.FC<TeacherProps> = props => {
  const selectedBackground = useSelectedBackground();

  return (
    <MaterialTable
      uniqueName="pages/subjects/editSubject/teacher/teacher"
      columns={[]}
      defaultActions={{
        columnFiltering: {
          active: true,
          columns: [
            { title: 'Email', field: 'email' },
            { title: 'firstname', field: 'firstname' },
            { title: 'lastname', field: 'lastname' },
          ],
          defaultColumns: ['firstname', 'lastname'],
        },
      }}
      data={(query: Query<Teacher>) =>
        props.onTeacherGet(query).then(res => ({
          page: query.page,
          totalCount: res.totalCount,
          data: res.teachers,
        }))
      }
      options={{
        rowStyle: (row: Teacher) => {
          if (row.id === props.selectedTeacher) {
            return { backgroundColor: selectedBackground };
          }

          return {};
        },
      }}
      actions={[
        {
          icon: AddIcon,
          tooltip: 'Select',
          onClick: (_, row) => {
            row = row as Teacher;
            props.onSelect(row.id);
          },
        },
      ]}
    />
  );
};

export default Teachers;
