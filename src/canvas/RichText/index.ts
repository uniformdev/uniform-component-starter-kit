import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { RichText } from './RichText';

export type RichTextProps = ComponentProps<{
  content?: string;
}>;

export enum RichTextVariants {
  Light = 'light',
}

[undefined, RichTextVariants.Light].forEach(variantId =>
  registerUniformComponent({
    type: 'richText',
    component: RichText,
    variantId,
  })
);

export default RichText;
