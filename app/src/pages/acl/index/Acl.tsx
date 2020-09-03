import React from 'react';

import { Paper } from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddBox';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';
import MaterialTable from 'lib/material-table';

import { AclProps } from './types';

const AddIconWithDisplayName = (): JSX.Element => <AddIcon />;

const Acl: React.FC<AclProps> = props => {
  const { t } = useTranslation(namespaces.pages.acl.index);

  return (
    <Paper>
      <MaterialTable
        title={t('tableTitle')}
        columns={props.columns}
        isLoading={props.loading}
        data={props.rows}
        cellEditable={{
          onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
            return new Promise((resolve, reject) => {
              props
                .onResourceChange({
                  roleId: columnDef.field as string,
                  resourceId: rowData.resourceId,
                  value: newValue,
                })
                .then(() => resolve())
                .catch(reject);
            });
          },
        }}
        options={{
          pageSize: props.rows.length,
          pageSizeOptions: [props.rows.length],
        }}
        hidePagination
        actions={[
          {
            tooltip: 'addRole',
            icon: AddIconWithDisplayName,
            onClick: props.onRoleAdd,
            isFreeAction: true,
            disabled: props.loading,
          },
        ]}
      />
    </Paper>
  );
};

export default Acl;
