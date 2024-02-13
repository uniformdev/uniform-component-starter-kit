import { CSSProperties } from 'react';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { Text } from './Text';

export type TextSizes =
  | 'XS'
  | 'SM'
  | 'Base'
  | 'LG'
  | 'XL'
  | '2XL'
  | '3XL'
  | '4XL'
  | '5XL'
  | '6XL'
  | '7XL'
  | '8XL'
  | '9XL';

export type TextTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
export type TextLetterSpacing = 'tighter' | 'tight' | 'normal' | 'wide' | 'wider' | 'widest';

export type TextProps = ComponentProps<{
  text?: string;
  tag?: TextTags;
  color?: Types.ThemeColorsValues | string;
  size?: TextSizes;
  letterSpacing?: TextLetterSpacing;
  style?: CSSProperties;
}>;

registerUniformComponent({
  type: 'text',
  component: Text,
});

export default Text;
