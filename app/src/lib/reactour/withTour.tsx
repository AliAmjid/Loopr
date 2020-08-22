import React, { useState } from 'react';

import { TFunction } from 'next-i18next';
import dynamic from 'next/dynamic';
import { ReactourStep } from 'reactour';
import { getDisplayName } from 'recompose';

import config from 'config';

import { useTranslation } from 'lib/i18n';

const Tour = dynamic(() => import('reactour'), { ssr: false });

const withTour = <ComponentProps extends {} = any>(
  steps: (t: TFunction) => ReactourStep[],
  defaultNamespace?: string,
) => (
  Component: React.ComponentType<ComponentProps>,
): React.ComponentType<ComponentProps> => (
  props: ComponentProps,
): JSX.Element => {
  const [tour, setTour] = useState(true);

  const { t } = useTranslation(defaultNamespace);
  Component.displayName = `${getDisplayName(Component)}-withTour`;

  return (
    <>
      {!config.disableTour && (
        <Tour
          steps={steps(t)}
          isOpen={tour}
          onRequestClose={() => setTour(false)}
        />
      )}
      <Component {...props} />
    </>
  );
};

export default withTour;
