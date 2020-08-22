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
      options={{ toolbar: false, emptyRowsWhenPaging: false, ...props.options }}
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
        body: {
          emptyDataSourceMessage: t('emptyDataSourceMessage'),
        },
      }}
    />
  );
};

export default MaterialTable;
