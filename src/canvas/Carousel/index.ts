import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { Carousel } from './Carousel';

export enum CarouselVariants {
  ImageGallery = 'imageGallery',
}

export type CarouselProps = ComponentProps;

[undefined, CarouselVariants.ImageGallery].forEach(variantId => {
  registerUniformComponent({
    type: 'carousel',
    component: Carousel,
    variantId,
  });
});

export default Carousel;
