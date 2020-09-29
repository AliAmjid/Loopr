import React, { useState } from 'react';

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
  const [fields, setField] = useState<Record<number, string | undefined>>({});
  const { fileData } = useAddCSVState(state => ({
    fileData: state.fileData,
  }));

  if (fileData.length === 0) {
    return <>No data</>;
  }

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            {fileData[0].data.map((title, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <TableCell key={index}>
                <Select
                  value={fields[index] || ''}
                  onChange={e =>
                    setField(prevState => ({
                      ...prevState,
                      [index]: e.target.value as string,
                    }))
                  }
                >
                  <MenuItem value="name">Jméno</MenuItem>
                  <MenuItem value="email">Email</MenuItem>
                  <MenuItem value="role">Role</MenuItem>
                </Select>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {fileData.slice(0, 3).map(row => (
            <TableRow>
              {row.data.map(title => (
                <TableCell>{title}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default FieldSelect;
