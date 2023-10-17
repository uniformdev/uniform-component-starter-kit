import { FC } from 'react';
import classNames from 'classnames';
import { BaseContainer } from './BaseContainer';
import { ContainerProps } from './';

export const ScreenContainer: FC<ContainerProps> = ({ children, className }) => (
  <BaseContainer className={classNames('m-auto max-w-screen-xl', className)}>{children}</BaseContainer>
);
