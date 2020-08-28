import React from 'react';

import { Paper } from '@material-ui/core';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';
import MaterialTable from 'lib/material-table';

import { AclProps } from './types';

const Acl: React.FC<AclProps> = props => {
  const { t } = useTranslation(namespaces.pages.acl.index);

  return (
    <Paper>
      <MaterialTable
        title={t('tableTitle')}
        columns={props.columns}
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
      />
    </Paper>
  );
};

export default Acl;
