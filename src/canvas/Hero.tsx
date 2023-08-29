import { FC, useMemo } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import {
  registerUniformComponent,
  ComponentProps,
  UniformText,
  useUniformCurrentComposition,
} from '@uniformdev/canvas-react';
import Button from '../components/Button';
import {
  getTextClass,
  getImageOverlayOpacityStyle,
  getImageOverlayColorStyle,
  getObjectFitClass,
} from '../utilities/styling';
import { formatProjectMapLink, getImageUrl } from '../utilities';

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
  overlayColor?: Types.AvailableColor;
  overlayOpacity?: Types.AvailableOpacity;
  objectFit?: Types.AvailableObjectFit;
}>;

export enum HeroVariant {
  ImageLeft = 'imageLeft',
  ImageRight = 'imageRight',
  BackgroundLightImage = 'backgroundLightImage',
  BackgroundDarkImage = 'backgroundDarkImage',
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
    case HeroVariant.BackgroundLightImage:
      return 'text-secondary-content';
    case HeroVariant.BackgroundDarkImage:
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
  titleStyle: TitleTag = 'h1',
  description,
  image,
  primaryButtonLink,
  primaryButtonStyle = 'primary',
  secondaryButtonLink,
  secondaryButtonStyle = 'primary',
  component: { variant } = {},
  overlayOpacity,
  overlayColor,
  objectFit,
}) => {
  const { isContextualEditing } = useUniformCurrentComposition();
  const shouldRenderImage = useMemo(
    () =>
      variant === HeroVariant.ImageLeft ||
      variant === HeroVariant.ImageRight ||
      variant === HeroVariant.BackgroundDarkImage ||
      variant === HeroVariant.BackgroundLightImage,
    [variant]
  );
  const imageUrl = getImageUrl(image);

  return (
    <div className={classNames('hero min-h-[500px] relative', getTextStyleClass(variant))}>
      <div className={classNames('hero-content text-center p-0', getHeroContentClass(variant))}>
        {shouldRenderImage &&
          Boolean(imageUrl) &&
          (variant === HeroVariant.BackgroundDarkImage || variant === HeroVariant.BackgroundLightImage ? (
            <>
              <Image
                fill
                alt="hero-image"
                src={imageUrl}
                priority
                className={classNames('absolute top-0 bottom-0 left-0 right-0 -z-10', getObjectFitClass(objectFit))}
              />
              <div
                className={classNames(
                  'absolute top-0 bottom-0 left-0 right-0 z-10',
                  getImageOverlayOpacityStyle(overlayOpacity),
                  getImageOverlayColorStyle(overlayColor)
                )}
              ></div>
            </>
          ) : (
            <div className="relative shrink-0">
              <Image
                width={500}
                height={500}
                alt="hero-image"
                src={imageUrl}
                className={classNames('rounded-lg md:h-[500px]', getObjectFitClass(objectFit))}
              />
              <div
                className={classNames(
                  'absolute top-0 bottom-0 left-0 right-0 z-10',
                  getImageOverlayOpacityStyle(overlayOpacity),
                  getImageOverlayColorStyle(overlayColor)
                )}
              ></div>
            </div>
          ))}
        <div className={classNames('flex flex-col mx-1 md:mx-10 z-20', getContentAlignClass(variant))}>
          <UniformText
            placeholder="Eyebrow text goes here"
            parameterId="eyebrowText"
            as="div"
            className={classNames('text-sm font-bold tracking-wider uppercase my-3', getPreTitleClass(variant))}
          />
          <UniformText
            placeholder="Title goes here"
            parameterId="title"
            as={TitleTag}
            className={classNames('font-bold', getTextClass(TitleTag))}
            data-testid="hero-title"
          />
          <UniformText placeholder="Description goes here" parameterId="description" as="div" className="py-6" />
          <div className={classNames('pb-6', { 'py-6': !description })}>
            {Boolean(primaryButtonLink) && (
              <Button
                className="mx-1"
                href={formatProjectMapLink(primaryButtonLink)}
                copy={
                  <UniformText
                    placeholder="Button Copy goes here"
                    parameterId="primaryButtonCopy"
                    onClick={isContextualEditing ? e => e.preventDefault() : undefined}
                  />
                }
                style={primaryButtonStyle}
              />
            )}
            {Boolean(secondaryButtonLink) && (
              <Button
                className="mx-1"
                href={formatProjectMapLink(secondaryButtonLink)}
                copy={
                  <UniformText
                    placeholder="Button Copy goes here"
                    parameterId="secondaryButtonCopy"
                    onClick={isContextualEditing ? e => e.preventDefault() : undefined}
                  />
                }
                style={secondaryButtonStyle}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

[
  undefined,
  HeroVariant.ImageLeft,
  HeroVariant.ImageRight,
  HeroVariant.BackgroundLightImage,
  HeroVariant.BackgroundDarkImage,
].forEach(variantId => {
  registerUniformComponent({
    type: 'hero',
    component: Hero,
    variantId,
  });
});

export default Hero;
