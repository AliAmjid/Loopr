import React, { useEffect, useState } from 'react';

import {
  Box,
  fade,
  makeStyles,
  Theme,
  Typography,
  useTheme,
} from '@material-ui/core';
import MaterialTablePrefab, {
  Column,
  MTableEditRow,
  MTableGroupbar,
  MTableToolbar,
} from 'material-table';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';
import useGroupingState from 'lib/material-table/actions/grouping/state';
import exportPDF from 'lib/material-table/exportPDF';
import materialTableLocalization from 'lib/material-table/localization';

import OverlayLoadingContainer from 'components/OverlayLoading/OverlayLoadingContainer';

import columnFilteringAction from './actions/columnFiltering';
import ColumnFilteringDialog from './actions/columnFiltering/ColumnFilteringDialog';
import useColumnFilteringState from './actions/columnFiltering/state';
import groupingAction from './actions/grouping';
import materialTableIcons from './icons';
import { MaterialTableCustomProps } from './types';

const exportPDFFunction = exportPDF;

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
  toolbar: {
    backgroundColor: fade(theme.palette.primary.main, 0.3),
  },
  toolbarTitle: {
    color: theme.palette.primary.main,
  },
}));

const Container: React.FC = props => <div>{props.children}</div>;

const MaterialTable = <RowD extends {}>(
  props: MaterialTableCustomProps<RowD>,
): JSX.Element => {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation(namespaces.lib.materialTable);
  const { selected, setSelected } = useColumnFilteringState(state => ({
    selected: state.selected,
    setSelected: state.setSelected,
  }));
  const { groupingActive, setGroupingActive } = useGroupingState(state => ({
    groupingActive: state.active,
    setGroupingActive: state.setActive,
  }));
  const [rowsPerPage, setRowsPerPage] = useState(50);

  useEffect(() => {
    if (!props.defaultActions?.grouping?.active && groupingActive === true)
      setGroupingActive(false);
    if (!props.defaultActions?.columnFiltering?.active && selected.length !== 0)
      setSelected([]);
  }, []);

  useEffect(() => {
    const savedSelectedString = window.localStorage.getItem(
      `${props.uniqueName}-selected`,
    );
    if (savedSelectedString) {
      const savedSelectedObject = JSON.parse(savedSelectedString);
      setSelected(savedSelectedObject);
    }
    const savedRowsPerPageString = window.localStorage.getItem(
      `${props.uniqueName}-rowsPerPage`,
    );
    if (savedRowsPerPageString) {
      const savedRowsPerPageObject = JSON.parse(savedRowsPerPageString);
      setRowsPerPage(savedRowsPerPageObject);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      `${props.uniqueName}-selected`,
      JSON.stringify(selected),
    );
  }, [selected]);
  useEffect(() => {
    if (rowsPerPage) {
      window.localStorage.setItem(
        `${props.uniqueName}-rowsPerPage`,
        JSON.stringify(rowsPerPage),
      );
    }
  }, [rowsPerPage]);

  let { columns } = props;
  if (props.defaultActions?.columnFiltering?.active) {
    columns = props.defaultActions.columnFiltering.columns.filter(
      (c): c is Column<RowD> =>
        'field' in c && selected.some((s: string) => s === c.field),
    );
  }

  const actions = [];

  if (props.defaultActions?.columnFiltering?.active)
    actions.push(columnFilteringAction(t));
  if (props.defaultActions?.grouping?.active) {
    actions.push(groupingAction(t));
  }

  let pageSizeOptions = [50, 100, 200, 400];
  if (props.totalCount && props.totalCount > 400) {
    pageSizeOptions = [...pageSizeOptions, props.totalCount];
  }

  return (
    <>
      <ColumnFilteringDialog
        columns={props.defaultActions?.columnFiltering?.columns || []}
        defaultColumns={
          props.defaultActions?.columnFiltering?.defaultColumns || []
        }
      />

      <OverlayLoadingContainer>
        <MaterialTablePrefab
          key={rowsPerPage}
          {...props}
          data={props.data}
          columns={columns}
          icons={materialTableIcons}
          localization={materialTableLocalization(t)}
          components={{
            // Toolbar: () => <div>ahoj</div>,
            Container,
            Toolbar: props => (
              <MTableToolbar
                {...props}
                classes={{ root: classes.toolbar, title: classes.toolbarTitle }}
              />
            ),
            // eslint-disable-next-line react/display-name
            Groupbar: p => {
              return (
                <div className={classes.groupbar}>
                  <MTableGroupbar {...p} />
                </div>
              );
            },
            // TODO remove after upgrade
            // eslint-disable-next-line react/display-name
            EditRow: tableProps => {
              return (
                <MTableEditRow
                  {...{
                    ...tableProps,
                    onBulkEditRowChanged:
                      typeof tableProps.onBulkEditRowChanged === 'function'
                        ? tableProps.onBulkEditRowChanged
                        : // eslint-disable-next-line @typescript-eslint/no-empty-function
                          () => {},
                  }}
                />
              );
            },
            // eslint-disable-next-line react/display-name
            ...(props.hidePagination && { Pagination: () => <div /> }),
            ...props.components,
          }}
          onChangeRowsPerPage={rows => {
            setRowsPerPage(rows);
          }}
          options={{
            search: false,
            filtering: true,

            emptyRowsWhenPaging: false,
            pageSize: rowsPerPage,
            pageSizeOptions,
            exportAllData: true,
            grouping: groupingActive,
            ...props.options,
            exportButton: props.options?.exportButton && !groupingActive,
            actionsCellStyle: { color: theme.palette.common.black },

            // TODO remove after upgrade
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore

            exportPdf: exportPDFFunction,
          }}
          actions={[...actions, ...(props.actions || [])]}
        />
      </OverlayLoadingContainer>
    </>
  );
};

export default MaterialTable;
