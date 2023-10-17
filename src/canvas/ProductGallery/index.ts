import { registerUniformComponent } from '@uniformdev/canvas-react';
import { ContainerVariants } from '../../components/Container';
import BaseProductGallery from '../../components/BaseProductGallery';

[undefined, ContainerVariants.BackgroundInContainer, ContainerVariants.FluidContent].forEach(variantId => {
  registerUniformComponent({
    type: 'productGallery',
    component: BaseProductGallery,
    variantId,
  });
});

export * from '../../components/BaseProductGallery';
export default BaseProductGallery;
