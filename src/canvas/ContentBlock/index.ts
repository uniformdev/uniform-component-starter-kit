import { Document } from '@contentful/rich-text-types';
import { registerUniformComponent, ComponentProps } from '@uniformdev/canvas-react';
import { ContentBlock } from './ContentBlock';

type Styles = {
  title?: string;
  text?: string;
};
export type ContentBlockProps = ComponentProps<{
  title?: string;
  titleStyle: Types.HeadingStyles;
  link?: Types.ProjectMapLink;
  text: string;
  content?: string | Document;
  styles?: Styles;
}>;

registerUniformComponent({
  type: 'content',
  component: ContentBlock,
});

export default ContentBlock;
