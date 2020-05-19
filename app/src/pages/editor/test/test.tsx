import React from 'react';

import {
  IconButton,
  List,
  ListItem,
  Table,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { TestProps } from './types';

const Test = (props: TestProps): JSX.Element => {
  const mappedColumns = props.testColumns.map(testColumn => (
    <ListItem key={`header${testColumn.id}`}>{testColumn.name}</ListItem>
  ));

  return (
    <>
      <List>
        {mappedColumns}
<ListItem>
        <IconButton color="primary" onClick={props.onAddClick}>
          <AddIcon />
        </IconButton>
</ListItem>
      </List>
    </>
  );
};

export default Test;
