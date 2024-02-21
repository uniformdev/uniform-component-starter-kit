import { FC } from 'react';
import { ErrorPropertyCalloutProps } from '.';

const ErrorPropertyCallout: FC<ErrorPropertyCalloutProps> = ({ classNames, title, text = '' }) => (
  <div className={classNames}>
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded font-sans">
      <strong className="font-bold">{title}</strong>
      <br />
      <span className="block sm:inline">{text}</span>
    </div>
  </div>
);

export default ErrorPropertyCallout;
