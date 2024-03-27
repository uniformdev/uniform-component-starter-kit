import { FC } from 'react';
import classNames from 'classnames';
import { EmptyPlaceholderProps } from '.';

const EmptyPlaceholder: FC<EmptyPlaceholderProps> = ({ className }) => (
  <div className={classNames('m-6 p-12', className)} />
);

export default EmptyPlaceholder;
