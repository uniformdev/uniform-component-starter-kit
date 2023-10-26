import { FC } from 'react';
import classNames from 'classnames';
import { BuildTimestampProps } from './';

const NEXT_PUBLIC_BUILD_TIMESTAMP = process.env.NEXT_PUBLIC_BUILD_TIMESTAMP;

const BuildTimestamp: FC<BuildTimestampProps> = ({ style }) =>
  NEXT_PUBLIC_BUILD_TIMESTAMP ? (
    <p className={classNames('text-gray-400 text-sm text-center lg:text-start', style)}>
      Built time: {new Date(Number(NEXT_PUBLIC_BUILD_TIMESTAMP)).toLocaleString()}
    </p>
  ) : null;

export default BuildTimestamp;
