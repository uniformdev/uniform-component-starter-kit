import { FC } from 'react';
import classNames from 'classnames';
import { EmptyPlaceholderProps } from '.';

const EmptyPlaceholder: FC<EmptyPlaceholderProps> = ({ className }) => (
  <div className={classNames('my-6 p-12 h-48 ', className)} />
);

export default EmptyPlaceholder;
