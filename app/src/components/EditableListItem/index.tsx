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
  Tooltip,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';

import { useTranslation } from 'lib/i18n';

import OverlayLoading from 'components/OverlayLoading';

import { EditableListItemProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  listItemText: {
    paddingRight: `${theme.spacing(18)}px !important`,
  },
}));

const EditableListItem: React.FC<EditableListItemProps> = props => {
  const classes = useStyles();

  const { t } = useTranslation();

  const editValue = props.edit === 'primary' ? props.primary : props.secondary;

  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(editValue);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const cancelHandler = (): void => {
    setEditing(false);
    setError(false);
  };
  const submitHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setLoading(true);
    props.onSubmit(`${value}`).then(success => {
      setLoading(false);

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
      autoFocus
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
      <OverlayLoading loading={loading} />
      <form>
        {props.edit === 'primary' ? primaryEditable : secondaryEditable}
        <ListItemSecondaryAction>
          {editing ? (
            <>
              <Tooltip title={`${t('actions.save')}`}>
                <IconButton
                  key="submit"
                  type="submit"
                  onClick={submitHandler}
                  color="primary"
                >
                  <DoneIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={`${t('actions.cancel')}`}>
                <IconButton onClick={cancelHandler}>
                  <ClearIcon />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <>
              {!props.editingDisabled && (
                <Tooltip title={`${t('actions.edit')}`}>
                  <IconButton
                    key="edit"
                    className={props.classes?.editIconButton || ''}
                    onClick={() => {
                      setEditing(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              )}
              {props.additionalActions}
            </>
          )}
        </ListItemSecondaryAction>
      </form>
    </>
  );
};

export default EditableListItem;
