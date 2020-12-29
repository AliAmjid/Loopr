import React from 'react';

import { mount } from 'enzyme';

import children from 'lib/jest/helpers/children';

import MaterialTable from '..';

describe('MaterialTable', () => {
  describe('defaultActions', () => {
    describe('filteringColumns', () => {
      const firstTitle = '__FirstTitle__';
      const firstField = 'field1';
      const secondTitle = '__SecondTitle__';
      const secondField = 'field2';
      const columns = [
        {
          title: firstTitle,
          field: firstField,
        },
        {
          title: secondTitle,
          field: secondField,
        },
      ];
      const data = [{ [firstField]: 'ABC', [secondField]: 'CBA' }];
      it('should render default column', () => {
        const wrapper = mount(
          <MaterialTable
            columns={[]}
            uniqueName="lib/material-table/tests/index"
            data={data}
            defaultActions={{
              columnFiltering: {
                active: true,
                defaultColumns: [firstField],
                columns,
              },
            }}
          />,
        );
        expect(wrapper.find(children(firstTitle)).length).toBe(1);
        expect(wrapper.find(children(secondTitle)).length).toBe(0);
      });
    });
  });
});
