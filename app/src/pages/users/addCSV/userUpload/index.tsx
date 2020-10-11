import React from 'react';

import { useQuery } from '@apollo/client';

import useAddCSVState from 'pages/users/addCSV/state';
import USERS_ADD_CSV_ACL_ROLES_QUERY from 'pages/users/addCSV/userUpload/queries/roles';

import addRolePrefix from 'components/addRolePrefix';
import UserImportTable from 'components/UserImportTable';
import { User, Users } from 'components/UserImportTable/types';

const UserUploadIndex: React.FC = () => {
  const { fields, fileData } = useAddCSVState(state => ({
    fields: state.fields,
    fileData: state.fileData,
  }));

  const users: Users = [];

  fileData.forEach(row => {
    const user: User = {
      username: '',
      role: '',
      name: '',
    };
    Object.values(fields).forEach((field, index) => {
      if (field !== '__nothing__') user[field] = row.data[index];
    });
    users.push(user);
  });

  return <UserImportTable users={users} />;
};
export default UserUploadIndex;
