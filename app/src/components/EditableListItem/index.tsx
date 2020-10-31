import React, { useEffect, useState } from 'react';

import {
  IconButton,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Theme,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';

import { EditableListItemProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  listItemText: {
    paddingRight: `${theme.spacing(13)}px !important`,
  },
}));

const EditableListItem: React.FC<EditableListItemProps> = props => {
  const classes = useStyles();

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

  const valueWithLookup = (value: any): string => {
    if (!props.lookup) {
      return value;
    }

    return props.lookup[value] || '???';
  };

  const textField = (
    <TextField
      value={value}
      onChange={e => setValue(e.target.value)}
      error={error}
      fullWidth
    />
  );

  const select = (
    <Select
      value={value}
      onChange={e => setValue(e.target.value as string)}
      error={error}
      fullWidth
    >
      {Object.keys(props.lookup || {}).map(lookupKey => (
        <MenuItem key={lookupKey} value={lookupKey}>
          {props.lookup![lookupKey]}
        </MenuItem>
      ))}
    </Select>
  );

  const editingField = props.lookup ? select : textField;

  const primaryEditable = (
    <ListItemText
      className={classes.listItemText}
      primary={editing ? editingField : valueWithLookup(props.primary)}
      secondary={props.secondary}
    />
  );
  const secondaryEditable = (
    <ListItemText
      className={classes.listItemText}
      primary={props.primary}
      secondary={editing ? editingField : valueWithLookup(props.secondary)}
      style={{ paddingRight: '50px' }}
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
