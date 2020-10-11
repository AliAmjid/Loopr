import React from 'react';

import useAddCSVState from 'pages/users/addCSV/state';

import UserImportTable from 'components/UserImportTable';

const UserUploadIndex: React.FC = () => {
  const {} = useAddCSVState(state => ({
    fields: state.fields,
    fileData: state.fileData,
  }));

  return <UserImportTable />;
};
export default UserUploadIndex;
