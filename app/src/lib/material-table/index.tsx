import React from 'react';

import MaterialTablePrefab, { MaterialTableProps } from 'material-table';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';
import materialTableIcons from 'lib/material-table/icons';

const MaterialTable = <RowData extends {}>(
  props: MaterialTableProps<RowData>,
): JSX.Element => {
  const { t } = useTranslation(namespaces.lib.materialTable);

  return (
    <MaterialTablePrefab
      {...props}
      icons={materialTableIcons}
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
      localization={{
        pagination: {
          nextTooltip: t('nextTooltip'),
          previousTooltip: t('previousTooltip'),
          lastTooltip: t('lastTooltip'),
          firstTooltip: t('firstTooltip'),
          labelRowsSelect: t('labelRowsSelect'),
          labelDisplayedRows: `{from}-{to} ${t('from')} {count}`,
        },
        header: {
          actions: t('actions'),
        },
        toolbar: {
          exportTitle: 'ahoj',
          exportName: 'Asd',
          // @ts-ignore
          exportCSVName: 'Exportovat jako CSV',
          // @ts-ignore
          exportPDFName: 'Exportovat jako PDF',
        },
        body: {
          emptyDataSourceMessage: t('emptyDataSourceMessage'),
        },
      }}
    />
  );
};

export default MaterialTable;
