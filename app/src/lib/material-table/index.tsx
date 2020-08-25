import React, { useState } from 'react';

import MaterialTablePrefab from 'material-table';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';
import materialTableLocalization from 'lib/material-table/localization';

import columnFiltering from './actions/columnFiltering';
import ColumnFilteringDialog from './actions/columnFiltering/ColumnFilteringDialog';
import materialTableIcons from './icons';
import { MaterialTableCustomProps } from './types';

const MaterialTable = <RowData extends {}>(
  props: MaterialTableCustomProps<RowData>,
): JSX.Element => {
  const { t } = useTranslation(namespaces.lib.materialTable);
  const [state, setState] = useState({
    columnFiltering: {
      open: false,
      defaultColumns: props.defaultActions?.columnFiltering?.defaultColumns,
      selected: props.defaultActions?.columnFiltering?.defaultColumns || [],
    },
  });

  let { columns } = props;

  if (props.defaultActions?.columnFiltering?.active) {
    columns = props.defaultActions.columnFiltering.columns.filter(c =>
      state.columnFiltering.selected.some(s => s === c.field),
    );
  }

  return (
    <>
      <ColumnFilteringDialog
        open={state.columnFiltering.open}
        onClose={() =>
          setState(prevState => ({
            ...prevState,
            columnFiltering: { ...prevState.columnFiltering, open: false },
          }))
        }
        columns={props.defaultActions?.columnFiltering?.columns || []}
        selected={state.columnFiltering.selected}
        onChange={e => {
          setState(prevState => ({
            ...prevState,
            columnFiltering: {
              ...prevState.columnFiltering,
              selected: e.target.value as string[],
            },
          }));
        }}
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
        actions={[
          columnFiltering({
            onClick: () =>
              setState(prevState => ({
                ...prevState,
                columnFiltering: { ...prevState.columnFiltering, open: true },
              })),
          }),
        ]}
      />
    </>
  );
};

export default MaterialTable;
