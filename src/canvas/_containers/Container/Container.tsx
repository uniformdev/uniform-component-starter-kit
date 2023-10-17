import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-react';
import BaseContainer from '../../../components/Container';
import { ContainerProps } from '.';

export const Container: FC<ContainerProps> = props => (
  <BaseContainer {...props} containerVariant={props?.component?.variant}>
    <UniformSlot name="container-inner" />
  </BaseContainer>
);
