import React from 'react';

import { useSnackbar } from 'notistack';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';
import CSVReader from 'lib/react-papaparse/CSVReader';

import useAddCSVState from 'pages/users/addCSV/state';

const CSVUpload: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { setUploadNext, setFileData } = useAddCSVState(state => ({
    setUploadNext: state.setUploadNext,
    setFileData: state.setFileData,
  }));
  const { t } = useTranslation(namespaces.pages.users.addCSV);

  const dropHandler = (data: any, file: any): void => {
    if (file.type !== 'text/csv') {
      enqueueSnackbar(t('notCSV'), { variant: 'error' });
      setUploadNext(false);

      return;
    }
    setFileData(data);
    setUploadNext(true);
  };

  const removeHandler = (): void => {
    setFileData([]);
    setUploadNext(false);
  };

  return (
    <CSVReader
      onDrop={dropHandler}
      onRemoveFile={removeHandler}
      addRemoveButton
    >
      {t('csvDropzone')}
    </CSVReader>
  );
};

export default CSVUpload;
