import { Localization } from 'material-table';
import { TFunction } from 'next-i18next';

const materialTableLocalization = (t: TFunction): Localization => ({
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
    exportTitle: t('exportTitle'),
    // TODO wait for update
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    exportCSVName: t('exportCSVName'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    exportPDFName: t('exportPDFName'),
  },
  body: {
    emptyDataSourceMessage: t('emptyDataSourceMessage'),
  },
});

export default materialTableLocalization;
