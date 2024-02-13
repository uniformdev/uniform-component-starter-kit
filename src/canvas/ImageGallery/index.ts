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

// Deprecated. Please use imageGallery component instead of productGallery. The productGallery will be removed.
[undefined, ContainerVariants.BackgroundInContainer, ContainerVariants.FluidContent].forEach(variantId => {
  registerUniformComponent({
    type: 'productGallery',
    component: BaseImageGallery,
    variantId,
  });
});

export * from '../../components/BaseImageGallery';
export default BaseImageGallery;
