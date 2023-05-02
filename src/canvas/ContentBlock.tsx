import { FC } from 'react';
import classNames from 'classnames';
import { registerUniformComponent, ComponentProps, UniformText } from '@uniformdev/canvas-react';
import { getTextClass } from '@/utils';

export type Props = ComponentProps<{
  title?: string;
  titleStyle: Types.HeadingStyles;
  text: string;
}>;

const ContentBlock: FC<Props> = ({ titleStyle: TitleTag = 'h1', text }) => (
  <div className={'items-center justify-between w-full gap-5 mx-auto lg:flex-nowrap rounded-xl'}>
    <UniformText parameterId="title" as={TitleTag} className={classNames('font-medium', getTextClass(TitleTag))} />
    {Boolean(text) ? <UniformText parameterId="text" as={TitleTag} className="py-6 text-xl" /> : null}
  </div>
);

registerUniformComponent({
  type: 'content',
  component: ContentBlock,
});

export default ContentBlock;
