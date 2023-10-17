import { FC } from 'react';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { CardBlockCarousel } from './CardBlockCarousel';
import { CardBlockDefault } from './CardBlock';

type Styles = {
  container?: string;
  title?: string;
  description?: string;
};

export type CardBlockProps = ComponentProps<{
  title: string;
  description?: string;
  titleStyle: Types.HeadingStyles;
  buttonCopy: string;
  buttonLink: Types.ProjectMapLink;
  buttonStyle: Types.ButtonStyles;
  buttonAnimationType?: Types.AnimationType;
  textColorVariant?: Types.AvailableTextColorVariant;
  styles?: Styles;
}>;

export enum CardBlockVariants {
  Carousel = 'carousel',
}

const CardBlock: FC<CardBlockProps> = props => {
  const { variant } = props.component || {};
  switch (variant) {
    case CardBlockVariants.Carousel:
      return <CardBlockCarousel {...props} />;
    default:
      return <CardBlockDefault {...props} />;
  }
};

[undefined, CardBlockVariants.Carousel].forEach(variantId => {
  registerUniformComponent({
    type: 'cardBlock',
    component: CardBlock,
    variantId,
  });
});

export default CardBlock;
