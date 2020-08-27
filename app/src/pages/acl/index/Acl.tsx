import React from 'react';

import MaterialTable from 'lib/material-table';

const Acl: React.FC = () => {
  return (
    <MaterialTable
      columns={[]}
      data={[{ name: 'asd' }]}
      defaultActions={{
        columnFiltering: {
          active: false,
          columns: undefined,
          defaultColumns: undefined,
        },
      }}
    >
      aho
    </MaterialTable>
  );
};

export default Acl;
