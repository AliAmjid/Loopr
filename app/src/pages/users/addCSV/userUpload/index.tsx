import React, { useEffect, useState } from 'react';

import { useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';

import useAddCSVState from 'pages/users/addCSV/state';

import {
  UsersAddCsvCreateUserMutation,
  UsersAddCsvCreateUserMutationVariables,
} from 'types/graphql';

import USERS_ADD_CSV_CREATE_USER from './mutations/createUser';
import { Row, Rows } from './types';
import UserUpload from './userUpload';

const UserUploadIndex: React.FC = () => {
  const { fileData, fields } = useAddCSVState(state => ({
    fileData: state.fileData,
    fields: state.fields,
  }));
  const [selected, setSelected] = useState<Rows>([]);
  const [errors, setErrors] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<Rows>([]);
  const [create] = useMutation<
    UsersAddCsvCreateUserMutation,
    UsersAddCsvCreateUserMutationVariables
  >(USERS_ADD_CSV_CREATE_USER);
  const { enqueueSnackbar } = useSnackbar();

  const selectedChangeHandler = (rows: Rows): void => {
    setSelected(rows);
  };
  const submitHandler = (): void => {
    let done = 0;

    const checkDone = (): void => {
      done++;

      if (done === selected.length) {
        setLoading(false);
        if (errors.length > 0) {
          enqueueSnackbar('Some errors', { variant: 'error' });
        }
      }
    };
    setLoading(true);
    selected.forEach(row => {
      create({
        variables: {
          input: { name: row.name, username: row.email, role: row.role },
        },
      })
        .then(() => {
          checkDone();
          if (errors.some(e => e === row.tableData?.id)) {
            const errorsCopy = [...errors];
            errorsCopy.splice(
              errorsCopy.findIndex(e => e === row.tableData?.id),
              1,
            );
            setErrors(errorsCopy);
          }
        })
        .catch(() => {
          checkDone();
          if (!errors.some(e => e === row.tableData?.id)) {
            setErrors(prevState => [...prevState, row.tableData?.id ?? 0]);
          }
        });
    });
  };

  useEffect(() => {
    const rows: Rows = [];

    fileData.forEach(fileDataRow => {
      const row: Row = { role: '', name: '', email: '' };
      Object.values(fields).forEach((field, fieldIndex) => {
        if (field !== '__nothing__') row[field] = fileDataRow.data[fieldIndex];
      });
      rows.push(row);
    });
    setRows(rows);
  }, [fileData, fields]);

  return (
    <UserUpload
      rows={rows}
      loading={loading}
      onSelectedChange={selectedChangeHandler}
      onSubmit={submitHandler}
    />
  );
};

export default UserUploadIndex;
