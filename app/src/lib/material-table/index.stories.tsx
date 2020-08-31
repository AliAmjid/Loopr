import React from 'react';

import { Column } from 'material-table';

import withDecorators from '../storybook/withDecorators';

import MaterialTable from './index';

export default withDecorators({ title: 'MaterialTable' });

const columns: Column<any>[] = [
  { title: 'title1', field: 'field1' },
  { title: 'title2', field: 'field2' },
];
const data = [
  { field1: 'A', field2: 'B' },
  { field1: 'AA', field2: 'BB' },
];
export const Basic: React.FC = () => (
  <MaterialTable title="Basic" columns={columns} data={data} />
);

export const WithGrouping: React.FC = () => (
  <MaterialTable
    title="WithGrouping"
    columns={columns}
    data={data}
    defaultActions={{ grouping: { active: true } }}
  />
);

export const WithColumnFiltering: React.FC = () => (
  <MaterialTable
    title="WithColumnFitlering"
    columns={[]}
    data={data}
    defaultActions={{
      columnFiltering: { active: true, defaultColumns: ['field1'], columns },
    }}
  />
);
