import { registerUniformComponent } from '@uniformdev/canvas-react';
import { ContainerVariants } from '../../components/Container';
import BaseImageGallery from '../../components/BaseImageGallery';

[undefined, ContainerVariants.BackgroundInContainer, ContainerVariants.FluidContent].forEach(variantId => {
  registerUniformComponent({
    type: 'imageGallery',
    component: BaseImageGallery,
    variantId,
  });
});

export * from '../../components/BaseImageGallery';
export default BaseImageGallery;
