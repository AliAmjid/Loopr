import React, { useCallback, useEffect, useState } from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
  Theme,
} from '@material-ui/core';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import OverlayLoading from 'components/OverlayLoading';
import OverlayLoadingContainer from 'components/OverlayLoading/OverlayLoadingContainer';

import { ColorChangeDialogProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  colorBox: {
    width: '100%',
    borderRadius: '100%',
    cursor: 'pointer',
  },
  selectedColorBox: {
    border: `4px solid ${theme.palette.primary.main}`,
  },
}));

const ColorChangeDialog: React.FC<ColorChangeDialogProps> = props => {
  const classes = useStyles();
  const [height, setHeight] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    undefined,
  );
  const { t } = useTranslation(namespaces.pages.teacherSubjects.index);

  useEffect(() => {
    setSelectedColor(props.defaultColor);
  }, [props.defaultColor]);

  const colorBoxRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().width);
    }
  }, []);

  const colors = [
    '#181E19',
    '#7E522B',
    '#FF0F0F',
    '#FF6F00',
    '#FFC917',
    '#FFF600',
    '#08C62E',
    '#7DFE3E',
    '#6C57FF',
    '#0E76FF',
    '#2AD3FF',
    '#FF50FF',
  ];

  const getColorItem = (color: string, ref?: any): JSX.Element => {
    return (
      <Grid item xs={2} key={color}>
        <div
          key={color}
          ref={ref}
          className={`${classes.colorBox} ${
            color === selectedColor && classes.selectedColorBox
          }`}
          style={{ backgroundColor: color, height }}
          onClick={() => setSelectedColor(color)}
          role="button"
          aria-label="change color"
          tabIndex={Math.random()}
          onKeyDown={e => {
            if (e.key === 'Enter') setSelectedColor(color);
          }}
        />
      </Grid>
    );
  };

  const firsColor = getColorItem(colors[0], colorBoxRef);

  colors.splice(0, 1);

  const mappedColors = colors.map(color => getColorItem(color));

  return (
    <Dialog open={props.open}>
      <OverlayLoadingContainer>
        <OverlayLoading loading={props.loading} />

        <DialogTitle>{t('changeColorTitle')}</DialogTitle>
        <DialogContent>
          <Box display="flex" flexWrap="wrap">
            <Grid container spacing={2}>
              {firsColor}
              {mappedColors}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={props.onCancel}>
            {t('common:actions.cancel')}
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => props.onSubmit(`${selectedColor}`)}
          >
            {t('common:actions.save')}
          </Button>
        </DialogActions>
      </OverlayLoadingContainer>
    </Dialog>
  );
};

export default ColorChangeDialog;
