import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { Carousel } from './Carousel';

export enum CarouselVariants {
  ImageGallery = 'imageGallery',
  Brochure = 'brochure',
}

export type CarouselProps = ComponentProps;

[undefined, CarouselVariants.ImageGallery, CarouselVariants.Brochure].forEach(variantId => {
  registerUniformComponent({
    type: 'carousel',
    component: Carousel,
    variantId,
  });
});

export default Carousel;
