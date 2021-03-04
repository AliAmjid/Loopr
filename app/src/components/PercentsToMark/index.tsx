import React, { useEffect, useState } from 'react';

import {
  Box,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import { PercentsErrors, PercentsToMarkProps, PercentsValues } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  textField: {
    width: theme.spacing(5),
  },
  table: {
    width: '100%',
  },
  cell: {
    textAlign: 'center',
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const PercentsToMark: React.FC<PercentsToMarkProps> = props => {
  const classes = useStyles();

  const { t } = useTranslation(namespaces.components.PercentsToMark);

  const { percents } = props;

  const isError = (value: number): boolean => value < 0 || value > 100;

  const getErrors = (percents: PercentsValues): PercentsErrors => {
    return {
      one: isError(+percents.one),
      two: isError(+percents.two),
      three: isError(+percents.three),
      four: isError(+percents.four),
    };
  };

  const errors = getErrors(props.percents);

  const getRow = (field: keyof PercentsValues, mark: number): JSX.Element => (
    <tr>
      <td className={classes.cell}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <TextField
            className={classes.textField}
            type="number"
            value={percents[field]}
            onChange={e => {
              const { value } = e.target;

              props.onPercentsChange({
                percents: { ...props.percents, [field]: value },
                errors: {
                  ...getErrors({
                    ...props.percents,
                  }),
                  [field]: isError(+value),
                },
              });
            }}
            error={errors[field]}
          />
          %
        </Box>
      </td>
      <td className={classes.cell}>
        <Typography variant="subtitle1">{`${mark}`}</Typography>
      </td>
    </tr>
  );

  return (
    <table className={props.fullWidth ? classes.table : ''}>
      <tr>
        <td className={classes.cell}>
          <Typography>{t('lowerLimit')}</Typography>
        </td>
        <td className={classes.cell}>
          <Typography>{t('correspondingMark')}</Typography>
        </td>
      </tr>
      {getRow('one', 1)}
      {getRow('two', 2)}
      {getRow('three', 3)}
      {getRow('four', 4)}
    </table>
  );
};

export default PercentsToMark;
