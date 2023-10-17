import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { Testimonial } from './Testimonial';

export enum TestimonialVariant {
  CardWrapped = 'cardWrapped',
}

export type TestimonialProps = ComponentProps<{
  personName: string;
  picture: string;
  logo: string;
  description: string;
  lineCountRestriction: Types.AvailableMaxLineCount;
}>;

[undefined, TestimonialVariant.CardWrapped].forEach(variantId =>
  registerUniformComponent({
    type: 'testimonial',
    component: Testimonial,
    variantId,
  })
);

export default Testimonial;
