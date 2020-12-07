import React, { useState } from 'react';

import {
  Box,
  IconButton,
  makeStyles,
  Step,
  StepLabel,
  Stepper as StepperPrefab,
  Theme,
  Tooltip,
} from '@material-ui/core';
import LeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import RightIcon from '@material-ui/icons/KeyboardArrowRight';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import { StepperProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  stepper: {
    width: '100%',
  },
  icon: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
}));
const Stepper: React.FC<StepperProps> = props => {
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);
  const { t } = useTranslation(namespaces.components.Stepper);

  const previousClickHandler = (): void => {
    if (activeStep > 0) setActiveStep(activeStep - 1);
  };

  const nextClickHandler = (): void => {
    if (activeStep < props.steps.length - 1) setActiveStep(activeStep + 1);
  };

  const currentStep = props.steps.find(step => step.index === activeStep);

  return (
    <>
      <Box display="flex" alignItems="center">
        <Box pl={4}>
          <Tooltip title={`${t('previous')}`}>
            <IconButton
              className={classes.icon}
              disabled={activeStep <= 0}
              onClick={previousClickHandler}
            >
              <LeftIcon className={classes.icon} />
            </IconButton>
          </Tooltip>
        </Box>
        <StepperPrefab
          activeStep={activeStep}
          alternativeLabel
          className={classes.stepper}
        >
          {props.steps.map(step => (
            <Step key={step.index}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </StepperPrefab>
        <Box pr={4}>
          <Tooltip title={`${t('next')}`}>
            <IconButton
              className={classes.icon}
              disabled={
                !currentStep?.nextActive ||
                activeStep === props.steps.length - 1 ||
                false
              }
              onClick={nextClickHandler}
            >
              <RightIcon className={classes.icon} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {props.steps.map(step => (
        <Box
          key={step.index}
          display={step.index === activeStep ? 'block' : 'none'}
        >
          {step.component}
        </Box>
      ))}
    </>
  );
};

export default Stepper;
