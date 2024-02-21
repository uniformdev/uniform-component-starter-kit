import { CSSProperties } from 'react';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { RichTextNode } from '@uniformdev/richtext';
import { RichText } from './RichText';

type Styles = {
  content?: string;
};

// Deprecated. Please use new  RichTextVariants component with. The RichTextVariants.Light will be removed
export enum RichTextVariants {
  Light = 'light',
}

export type RichTextProps = ComponentProps<{
  content?: RichTextNode;
  color?: Types.ThemeColorsValues | string;
  style?: CSSProperties;
  styles?: Styles;
}>;

registerUniformComponent({
  type: 'richText',
  component: RichText,
});

export default RichText;
