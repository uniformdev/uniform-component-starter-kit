import { FC } from 'react';
import classNames from 'classnames';
import { ContainerProps } from './';

export const BaseContainer: FC<ContainerProps> = ({ children, className }) => (
  <div className={classNames(className)}>{children}</div>
);
