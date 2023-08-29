import { FC } from 'react';

const NEXT_PUBLIC_BUILD_TIMESTAMP = process.env.NEXT_PUBLIC_BUILD_TIMESTAMP;

const BuildTimestamp: FC = () =>
  NEXT_PUBLIC_BUILD_TIMESTAMP ? (
    <p className="text-gray-400 text-sm text-center lg:text-start">
      Built time: {new Date(NEXT_PUBLIC_BUILD_TIMESTAMP).toLocaleString()}
    </p>
  ) : null;

export default BuildTimestamp;
