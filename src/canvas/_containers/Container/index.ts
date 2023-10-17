import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { withoutContainer } from '../../../hocs/withoutContainer';
import { ContainerProps as BaseContainerProps, ContainerVariants } from '../../../components/Container';
import { Container } from './Container';

export type ContainerProps = ComponentProps<BaseContainerProps>;

[undefined, ContainerVariants.BackgroundInContainer, ContainerVariants.FluidContent].forEach(variantId => {
  registerUniformComponent({
    type: 'container',
    component: withoutContainer(Container),
    variantId,
  });
});

export default Container;
