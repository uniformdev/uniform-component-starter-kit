import { FC } from 'react';
import classNames from 'classnames';
import { UniformSlot, registerUniformComponent, ComponentProps, UniformText } from '@uniformdev/canvas-react';
import { getTextClass } from '@/utils';
import Button from '@/components/Button';
import Carousel from '@/canvas/Carousel';

export type CardBlockProps = ComponentProps<{
  title: string;
  description?: string;
  titleStyle: Types.HeadingStyles;
  buttonCopy: string;
  buttonLink: Types.ProjectMapLink;
  buttonStyle: Types.ButtonStyles;
}>;

export enum CardBlockVariants {
  Carousel = 'carousel',
}

const CardBlock: FC<CardBlockProps> = ({
  description,
  buttonCopy,
  buttonLink,
  titleStyle: TitleTag = 'h1',
  buttonStyle,
}) => (
  <div className="flex items-center text-secondary-content justify-between py-2 flex-wrap">
    <div className="w-full flex flex-col md:flex-row md:items-center justify-between px-3 pb-6">
      <div className="basis-2/3 xl:basis-auto">
        <UniformText parameterId="title" as={TitleTag} className={classNames('font-bold', getTextClass(TitleTag))} />
        {Boolean(description) && <UniformText parameterId="description" as="p" className="py-6" />}
      </div>
      {Boolean(buttonCopy && buttonLink) && (
        <Button href={buttonLink.path} copy={<UniformText parameterId="buttonCopy" />} style={buttonStyle} />
      )}
    </div>
    <UniformSlot name="cardBlockInner" />
  </div>
);

[undefined, CardBlockVariants.Carousel].forEach(variantId => {
  registerUniformComponent({
    type: 'cardBlock',
    component: variantId === CardBlockVariants.Carousel ? Carousel : CardBlock,
    variantId,
  });
});

export default CardBlock;
