import { FC } from 'react';
import dynamic from 'next/dynamic';
import { CountdownProps } from '.';
import { getBoxStyle } from './helpers';

const CountdownEntry = dynamic(() => import('./CountdownEntry').then(mod => mod.CountdownEntry), {
  ssr: false,
});

export const Countdown: FC<CountdownProps> = props => {
  const { size, component } = props;

  const boxClass = getBoxStyle(size, component?.variant);
  return (
    <div className={boxClass}>
      <CountdownEntry {...props} />
    </div>
  );
};
