import { FC } from 'react';
import classNames from 'classnames';
import {
  UniformSlot,
  registerUniformComponent,
  ComponentProps,
  UniformText,
  useUniformCurrentComposition,
} from '@uniformdev/canvas-react';
import Button from '../components/Button';
import CardBlockCarousel from './CardBlockCarousel';
import { getTextClass } from '../utilities/styling';
import { formatProjectMapLink } from '../utilities';

export type Props = ComponentProps<{
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

const CardBlock: FC<Props> = ({ buttonLink, titleStyle: TitleTag = 'h1', buttonStyle }) => {
  const { isContextualEditing } = useUniformCurrentComposition();
  return (
    <div className="flex items-center text-secondary-content justify-between py-2 gap-2 flex-wrap">
      <div className="w-full flex flex-col md:flex-row md:items-center justify-between px-3 pb-6">
        <div className="basis-2/3 xl:basis-auto">
          <UniformText
            placeholder="Title goes here"
            parameterId="title"
            as={TitleTag}
            className={classNames('font-bold', getTextClass(TitleTag))}
          />
          <UniformText placeholder="Description goes here" parameterId="description" as="p" className="py-6" />
        </div>
        {Boolean(buttonLink) && (
          <Button
            href={formatProjectMapLink(buttonLink)}
            copy={
              <UniformText
                placeholder="Button copy goes here"
                parameterId="buttonCopy"
                onClick={isContextualEditing ? e => e.preventDefault() : undefined}
              />
            }
            style={buttonStyle}
          />
        )}
      </div>
      <UniformSlot name="cardBlockInner" />
    </div>
  );
};

[undefined, CardBlockVariants.Carousel].forEach(variantId => {
  registerUniformComponent({
    type: 'cardBlock',
    component: variantId === CardBlockVariants.Carousel ? CardBlockCarousel : CardBlock,
    variantId,
  });
});

export default CardBlock;
