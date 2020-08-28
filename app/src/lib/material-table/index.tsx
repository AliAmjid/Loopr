import React from 'react';

import { fade, makeStyles, Theme } from '@material-ui/core';
import MaterialTablePrefab, { Column, MTableGroupbar } from 'material-table';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';
import useGroupingState from 'lib/material-table/actions/grouping/state';
import materialTableLocalization from 'lib/material-table/localization';

import columnFilteringAction from './actions/columnFiltering';
import ColumnFilteringDialog from './actions/columnFiltering/ColumnFilteringDialog';
import useColumnFilteringState from './actions/columnFiltering/state';
import groupingAction from './actions/grouping';
import materialTableIcons from './icons';
import { MaterialTableCustomProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  groupbar: {
    backgroundColor: fade(theme.palette.common.black, 0.01),
    borderRadius: theme.shape.borderRadius,
    border: 'none',
    '& div': {
      '& div': {
        border: 'none !important',
        borderRadius: theme.shape.borderRadius,
      },
    },
  },
}));

const MaterialTable = <RowData extends {}>(
  props: MaterialTableCustomProps<RowData>,
): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation(namespaces.lib.materialTable);
  const selected = useColumnFilteringState(state => state.selected);
  const groupingActive = useGroupingState(state => state.active);

  let { columns } = props;
  if (props.defaultActions?.columnFiltering?.active) {
    columns = props.defaultActions.columnFiltering.columns.filter(
      (c): c is Column<RowData> =>
        'field' in c && selected.some((s: string) => s === c.field),
    );
  }

  const actions = [];

  if (props.defaultActions?.columnFiltering?.active)
    actions.push(columnFilteringAction(t));
  if (props.defaultActions?.grouping?.active) {
    actions.push(groupingAction(t));
  }

  return (
    <>
      <ColumnFilteringDialog
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
          // eslint-disable-next-line react/display-name
          Groupbar: p => {
            return (
              <div className={classes.groupbar}>
                <MTableGroupbar {...p} />
              </div>
            );
          },
          // eslint-disable-next-line react/display-name
          ...(props.hidePagination && { Pagination: () => <div /> }),
          ...props.components,
        }}
        options={{
          search: false,
          filtering: true,
          emptyRowsWhenPaging: false,
          pageSize: 50,
          pageSizeOptions: [50, 100, 200, 400],
          exportAllData: true,
          grouping: groupingActive,
          ...props.options,
          exportButton: props.options?.exportButton && !groupingActive,
        }}
        actions={[...actions, ...(props.actions || [])]}
      />
    </>
  );
};

export default MaterialTable;
