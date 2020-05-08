import React, { useState } from 'react';

import dynamic from 'next/dynamic';
import { ReactourStep } from 'reactour';

const Tour = dynamic(() => import('reactour'), { ssr: false });

const withTour = <ComponentProps extends {} = any>(
  Component: React.FC<ComponentProps>,
  steps: ReactourStep[],
) => (props: ComponentProps): JSX.Element => {
  const [tour, setTour] = useState(true);

  return (
    <>
      <Tour steps={steps} isOpen={tour} onRequestClose={() => setTour(false)} />
      <Component {...props} />
    </>
  );
};

export default withTour;
