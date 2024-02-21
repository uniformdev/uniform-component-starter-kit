import { FC } from 'react';
import classNames from 'classnames';
import { BuildTimestampProps } from './';

const BuildTimestamp: FC<BuildTimestampProps> = ({ style }) =>
  process.env.NEXT_PUBLIC_BUILD_TIMESTAMP ? (
    <p data-test="ignore" className={classNames('text-gray-500 text-sm text-center lg:text-start', style)}>
      Built time: {new Date(Number(process.env.NEXT_PUBLIC_BUILD_TIMESTAMP)).toLocaleString()}
      {process.env.NEXT_PUBLIC_APP_VERSION && ` v.${process.env.NEXT_PUBLIC_APP_VERSION}`}
    </p>
  ) : null;

export default BuildTimestamp;
