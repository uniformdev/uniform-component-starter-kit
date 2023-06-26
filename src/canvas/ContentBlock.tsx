import { FC } from 'react';
import classNames from 'classnames';
import { registerUniformComponent, ComponentProps, UniformText } from '@uniformdev/canvas-react';
import { getTextClass } from '@/utils';

export type Props = ComponentProps<{
  title?: string;
  titleStyle: Types.HeadingStyles;
  text: string;
}>;

const ContentBlock: FC<Props> = ({ titleStyle: TitleTag = 'h1' }) => (
  <div className={'text-secondary-content items-center justify-between w-full gap-5 mx-auto lg:flex-nowrap rounded-xl'}>
    <UniformText
      placeholder="Title goes here"
      parameterId="title"
      as={TitleTag}
      className={classNames('font-medium', getTextClass(TitleTag))}
    />
    <UniformText placeholder="Text goes here" parameterId="text" as={TitleTag} className="py-6 text-xl" />
  </div>
);

registerUniformComponent({
  type: 'content',
  component: ContentBlock,
});

export default ContentBlock;
