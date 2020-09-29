import React, { useEffect, useState } from 'react';

import {
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';

import useAddCSVState from 'pages/users/addCSV/state';

const FieldSelect: React.FC = () => {
  const { fileData } = useAddCSVState(state => ({
    fileData: state.fileData,
  }));
  const [fields, setField] = useState<string[]>(
    fileData.map(() => '__nothing__'),
  );

  useEffect(() => {
    setField(fileData.map(() => '__nothing__'));
  }, [fileData]);

  if (fileData.length === 0) {
    return <>No data</>;
  }

  const requiredFields = [
    { value: 'name', label: 'Name' },
    { value: 'email', label: 'Email' },
    { value: 'role', label: 'Role' },
    { value: '__nothing__', label: '----' },
  ];

  const HeadSelect = (index: number): JSX.Element => (
    <Select
      value={fields[index] || ''}
      onChange={e => {
        const updatedFields = { ...fields };
        updatedFields[index] = e.target.value as string;
        setField(updatedFields);

        let complete = true;
        requiredFields.forEach(field => {
          if (!Object.values(updatedFields).some(f => f === field.value)) {
            complete = false;
          }
        });
        const fieldsWithoutNothing = Object.values(updatedFields).filter(
          f => f !== '__nothing__',
        );
        if (
          new Set(fieldsWithoutNothing).size !== fieldsWithoutNothing.length
        ) {
          complete = false;
        }
        console.log('complete', complete);
      }}
    >
      {requiredFields.map(field => {
        return (
          <MenuItem value={field.value} key={field.value}>
            {field.label}
          </MenuItem>
        );
      })}
    </Select>
  );

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            {fileData[0].data.map((title, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <TableCell key={index}>{HeadSelect(index)}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {fileData.slice(0, 5).map((row, index) => {
            return row ? (
              // eslint-disable-next-line react/no-array-index-key
              <TableRow key={index}>
                {row.data.map((value, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <TableCell key={value + index}>{value}</TableCell>
                ))}
              </TableRow>
            ) : (
              <></>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default FieldSelect;
