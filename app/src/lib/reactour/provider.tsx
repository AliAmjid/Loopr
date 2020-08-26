import React, { useState } from 'react';

import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';
import { ReactourStep } from 'reactour';

import config from 'config';

import loginTour from 'pages/login/tour';

import { ReactourProvider as ReactourProviderPrefab } from './context';

const Tour = dynamic(() => import('reactour'), { ssr: false });
const ReactourProvider: React.FC<any> = props => {
  const [steps, setSteps] = useState<ReactourStep[] | null>(null);
  const [namespace, setNamespace] = useState('');
  const { t } = useTranslation(namespace);

  return (
    <ReactourProviderPrefab
      value={{
        start: props => {
          setSteps(props.steps(t));
          setNamespace(props.defaultNamespace || '');
        },
        close: () => setSteps(null),
      }}
    >
      <Tour
        isOpen={Boolean(steps) && !config.disableTour}
        steps={loginTour(t)}
        onRequestClose={() => setSteps(null)}
      />
      {props.children}
    </ReactourProviderPrefab>
  );
};

export default ReactourProvider;
