import React from 'react';

import { useTheme } from '@material-ui/core';
import { CSVReader as CSVReaderPrefab } from 'react-papaparse';

import { CSVReaderProps } from './types';

const CSVReader: React.FC<CSVReaderProps> = props => {
  const theme = useTheme();

  return (
    <CSVReaderPrefab
      {...props}
      style={{
        dropArea: {
          borderRadius: theme.shape.borderRadius,
        },
        removeButton: {
          color: theme.palette.error.main,
        },
        progressBar: {
          backgroundColor: theme.palette.primary.main,
        },
        dropFile: {
          background: theme.palette.common.white,
          border: '1px solid black',
          width: 'auto',
          borderRadius: theme.shape.borderRadius,
        },
      }}
    >
      {props.children}
    </CSVReaderPrefab>
  );
};

export default CSVReader;
