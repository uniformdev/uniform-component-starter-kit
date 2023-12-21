import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { RichText } from './RichText';

type Styles = {
  content: string;
};

export type RichTextProps = ComponentProps<{
  content?: string;
  styles?: Styles;
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
