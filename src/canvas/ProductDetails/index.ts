import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { ContainerProps as BaseContainerProps, ContainerVariants } from '../../components/Container';
import { withoutContainer } from '../../hocs/withoutContainer';
import { ProductDetails } from './ProductDetails';

export type ProductDetailsProps = ComponentProps<BaseContainerProps>;

[undefined, ContainerVariants.BackgroundInContainer, ContainerVariants.FluidContent].forEach(variantId => {
  registerUniformComponent({
    type: 'productDetails',
    component: withoutContainer(ProductDetails),
    variantId,
  });
});

export default withoutContainer(ProductDetails);
