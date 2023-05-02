import { FC, useMemo } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { registerUniformComponent, ComponentProps, UniformText } from '@uniformdev/canvas-react';
import { getTextClass, getImageUrl } from '@/utils';
import Button from '@/components/Button';

export type Props = ComponentProps<{
  eyebrowText: string;
  title: string;
  titleStyle: Types.HeadingStyles;
  description: string;
  image?: string;
  primaryButtonCopy: string;
  primaryButtonLink: Types.ProjectMapLink;
  primaryButtonStyle: Types.ButtonStyles;
  secondaryButtonCopy: string;
  secondaryButtonLink: Types.ProjectMapLink;
  secondaryButtonStyle: Types.ButtonStyles;
}>;

export enum HeroVariant {
  ImageLeft = 'imageLeft',
  ImageRight = 'imageRight',
  BackgroundImage = 'backgroundImage',
}

const getHeroContentClass = (variantId?: string) => {
  switch (variantId) {
    case HeroVariant.ImageLeft:
      return 'flex-col lg:flex-row';
    case HeroVariant.ImageRight:
      return 'flex-col lg:flex-row-reverse';
    default:
      return '';
  }
};

const getTextStyleClass = (variantId: string | undefined) => {
  switch (variantId) {
    case HeroVariant.BackgroundImage:
      return 'text-primary-content';
    default:
      return 'text-secondary-content';
  }
};

const getContentAlignClass = (variantId: string | undefined) => {
  switch (variantId) {
    case HeroVariant.ImageLeft:
      return 'text-start';
    case HeroVariant.ImageRight:
      return 'text-start';
    default:
      return '';
  }
};

const getPreTitleClass = (variantId: string | undefined) => {
  switch (variantId) {
    case HeroVariant.ImageLeft:
      return 'text-primary';
    case HeroVariant.ImageRight:
      return 'text-primary';
    default:
      return '';
  }
};

const Hero: FC<Props> = ({
  eyebrowText,
  titleStyle: TitleTag = 'h1',
  description,
  image,
  primaryButtonCopy,
  primaryButtonLink,
  primaryButtonStyle = 'primary',
  secondaryButtonCopy,
  secondaryButtonLink,
  secondaryButtonStyle = 'primary',
  component: { variant } = {},
}) => {
  const shouldRenderImage = useMemo(
    () =>
      variant === HeroVariant.ImageLeft ||
      variant === HeroVariant.ImageRight ||
      variant === HeroVariant.BackgroundImage,
    [variant]
  );
  const imageUrl = getImageUrl(image);
  return (
    <div className={classNames('hero min-h-[500px] relative', getTextStyleClass(variant))}>
      {variant === HeroVariant.BackgroundImage && <div className="hero-overlay bg-opacity-60"></div>}
      <div className={classNames('hero-content text-center p-0', getHeroContentClass(variant))}>
        {shouldRenderImage &&
          Boolean(imageUrl) &&
          (variant === HeroVariant.BackgroundImage ? (
            <Image
              fill
              alt="hero-image"
              src={imageUrl}
              priority
              className="absolute top-0 bottom-0 left-0 right-0 object-cover -z-10"
            />
          ) : (
            <Image
              width={500}
              height={500}
              alt="hero-image"
              src={imageUrl}
              className="rounded-lg shadow-2xl md:h-[500px]"
            />
          ))}
        <div className={classNames('flex flex-col mx-1 md:mx-10', getContentAlignClass(variant))}>
          {eyebrowText && (
            <UniformText
              parameterId="eyebrowText"
              as="div"
              className={classNames('text-sm font-bold tracking-wider uppercase my-3', getPreTitleClass(variant))}
            />
          )}
          <UniformText parameterId="title" as={TitleTag} className={classNames('font-bold', getTextClass(TitleTag))} />
          <UniformText parameterId="description" as="div" className={classNames('py-6')} />
          <div className={classNames('pb-6', { 'py-6': !description })}>
            {Boolean(primaryButtonCopy && primaryButtonLink) && (
              <Button
                className="mx-1"
                href={primaryButtonLink.path}
                copy={<UniformText parameterId="primaryButtonCopy" />}
                style={primaryButtonStyle}
              />
            )}
            {Boolean(secondaryButtonCopy && secondaryButtonLink) && (
              <Button
                className="mx-1"
                href={secondaryButtonLink.path}
                copy={<UniformText parameterId="secondaryButtonCopy" />}
                style={secondaryButtonStyle}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

[undefined, HeroVariant.ImageLeft, HeroVariant.ImageRight, HeroVariant.BackgroundImage].forEach(variantId => {
  registerUniformComponent({
    type: 'hero',
    component: Hero,
    variantId,
  });
});

export default Hero;
