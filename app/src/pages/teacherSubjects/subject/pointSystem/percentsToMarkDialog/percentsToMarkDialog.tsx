import React, { useEffect, useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from '@material-ui/core';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import OverlayLoading from 'components/OverlayLoading';
import OverlayLoadingContainer from 'components/OverlayLoading/OverlayLoadingContainer';
import PercentsToMark from 'components/PercentsToMark';
import {
  PercentsErrors,
  PercentsValues,
} from 'components/PercentsToMark/types';

import { PercentsToMarkDialogProps } from './types';

const PercentsToMarkDialog: React.FC<PercentsToMarkDialogProps> = props => {
  const [percents, setPercents] = useState<{
    percents: PercentsValues;
    errors: PercentsErrors;
  }>({
    percents: props.defaultValues,
    errors: { one: false, two: false, three: false, four: false },
  });
  const { t } = useTranslation(
    namespaces.pages.teacherSubjects.subject.pointSystem,
  );
  useEffect(() => {
    setPercents({
      percents: props.defaultValues,
      errors: { one: false, two: false, three: false, four: false },
    });
  }, [props.defaultValues]);

  return (
    <Dialog open={props.open}>
      <OverlayLoadingContainer>
        <OverlayLoading loading={props.loading} />

        <DialogContent>
          <PercentsToMark
            percents={percents.percents}
            onPercentsChange={setPercents}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={props.onCancel}>
            {t('common:actions.cancel')}
          </Button>
          <Button
            color="primary"
            variant="contained"
            disabled={Object.values(percents.errors).some(error => error)}
            onClick={() => props.onSubmit(percents.percents)}
          >
            {t('common:actions.save')}
          </Button>
        </DialogActions>
      </OverlayLoadingContainer>
    </Dialog>
  );
};

export default PercentsToMarkDialog;
