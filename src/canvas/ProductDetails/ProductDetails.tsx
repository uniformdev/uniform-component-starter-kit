import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-react';
import BaseContainer from '../../components/Container';
import { ProductDetailsProps } from '.';

export const ProductDetails: FC<ProductDetailsProps> = props => (
  <BaseContainer {...props} containerVariant={props?.component?.variant}>
    <UniformSlot name="container-inner" />
  </BaseContainer>
);
