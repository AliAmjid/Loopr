import React from 'react';

import MaterialTablePrefab from 'material-table';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';
import materialTableLocalization from 'lib/material-table/localization';

import columnFilteringAction from './actions/columnFiltering';
import ColumnFiltering from './actions/columnFiltering/ColumnFiltering';
import useColumnFilteringState from './actions/columnFiltering/state';
import materialTableIcons from './icons';
import { MaterialTableCustomProps } from './types';

const MaterialTable = <RowData extends {}>(
  props: MaterialTableCustomProps<RowData>,
): JSX.Element => {
  const { t } = useTranslation(namespaces.lib.materialTable);
  const columnFilteringState = useColumnFilteringState();

  let { columns } = props;
  if (props.defaultActions?.columnFiltering?.active) {
    columns = props.defaultActions.columnFiltering.columns.filter(c =>
      columnFilteringState.selected.some(s => s === c.field),
    );
  }

  return (
    <>
      <ColumnFiltering
        columns={props.defaultActions?.columnFiltering?.columns || []}
        defaultColumns={
          props.defaultActions?.columnFiltering?.defaultColumns || []
        }
      />
      <MaterialTablePrefab
        {...props}
        columns={columns}
        icons={materialTableIcons}
        localization={materialTableLocalization(t)}
        components={{
          Container: p => p.children,
          ...props.components,
        }}
        options={{
          search: false,
          filtering: true,
          emptyRowsWhenPaging: false,
          pageSize: 50,
          pageSizeOptions: [50, 100, 200, 400],
          exportAllData: true,

          ...props.options,
        }}
        actions={[columnFilteringAction]}
      />
    </>
  );
};

export default MaterialTable;
