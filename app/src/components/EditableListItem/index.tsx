import React, { useEffect, useState } from 'react';

import {
  IconButton,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';

import { EditableListItemProps } from './types';

const EditableListItem: React.FC<EditableListItemProps> = props => {
  const editValue = props.edit === 'primary' ? props.primary : props.secondary;

  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(editValue);
  const [error, setError] = useState(false);

  const cancelHandler = (): void => {
    setEditing(false);
    setValue(editValue);
    setError(false);
  };
  const submitHandler = (): void => {
    props.onSubmit(`${value}`).then(success => {
      if (success) cancelHandler();
      else setError(true);
    });
  };

  useEffect(() => {
    setValue(editValue);
  }, [props.primary, props.secondary, props.edit]);

  const textField = (
    <TextField
      value={value}
      onChange={e => setValue(e.target.value)}
      error={error}
      fullWidth
    />
  );

  const primaryEditable = (
    <ListItemText
      primary={editing ? textField : props.primary}
      secondary={props.secondary}
    />
  );
  const secondaryEditable = (
    <ListItemText
      primary={props.primary}
      secondary={editing ? textField : props.secondary}
    />
  );

  return (
    <>
      {props.edit === 'primary' ? primaryEditable : secondaryEditable}
      <ListItemSecondaryAction>
        {editing ? (
          <>
            <IconButton onClick={submitHandler} color="primary">
              <DoneIcon />
            </IconButton>
            <IconButton onClick={cancelHandler}>
              <ClearIcon />
            </IconButton>
          </>
        ) : (
          <IconButton onClick={() => setEditing(true)}>
            <EditIcon />
          </IconButton>
        )}
      </ListItemSecondaryAction>
    </>
  );
};

export default EditableListItem;
