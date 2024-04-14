import { FC, Fragment, PropsWithChildren } from 'react';
import classNames from 'classnames';
import {
  PaddingSize,
  getImageOverlayColorStyle,
  getImageOverlayOpacityStyle,
  getObjectFitClass,
  getTextClass,
} from '../../utilities/styling';
import { UniformText } from '@uniformdev/canvas-react';
import Button from '../../components/Button';
import { formatProjectMapLink, getMediaUrl } from '../../utilities';
import Image from '../../components/Image';
import BaseContainer, { ContainerVariants, ContainerProps, ScreenContainer } from '../../components/Container';
import { HeroProps } from './';

export const Title: FC<Pick<HeroProps, 'titleStyle' | 'useCustomTextElements' | 'title'> & { className?: string }> = ({
  titleStyle: TitleTag,
  useCustomTextElements,
  title,
  className,
}) =>
  useCustomTextElements ? (
    <TitleTag className={classNames('font-bold', getTextClass(TitleTag))}>{title}</TitleTag>
  ) : (
    <UniformText
      placeholder="Title goes here"
      parameterId="title"
      as={TitleTag}
      className={classNames('font-bold', getTextClass(TitleTag), className)}
      data-testid="hero-title"
    />
  );

export const EyebrowText: FC<{ className?: string }> = ({ className }) => (
  <UniformText
    placeholder="Eyebrow text goes here"
    parameterId="eyebrowText"
    as="div"
    className={classNames('font-bold tracking-wider uppercase my-3 text-sm', className)}
  />
);

export const Description: FC<{ className?: string }> = ({ className }) => (
  <UniformText
    placeholder="Description goes here"
    parameterId="description"
    as="div"
    className={classNames('whitespace-break-spaces py-6', className)}
  />
);

export const PrimaryButton: FC<Pick<HeroProps, 'primaryButtonLink' | 'primaryButtonStyle' | 'animationType'>> = ({
  primaryButtonLink,
  primaryButtonStyle,
  animationType,
}) => (
  <Button
    className="m-1"
    animationType={animationType}
    href={formatProjectMapLink(primaryButtonLink)}
    copy={<UniformText placeholder="Button copy goes here" parameterId="primaryButtonCopy" />}
    style={primaryButtonStyle}
  />
);

export const SecondaryButton: FC<Pick<HeroProps, 'secondaryButtonLink' | 'secondaryButtonStyle' | 'animationType'>> = ({
  secondaryButtonLink,
  secondaryButtonStyle,
  animationType,
}) => (
  <Button
    className="m-1"
    href={formatProjectMapLink(secondaryButtonLink)}
    animationType={animationType}
    copy={<UniformText placeholder="Button copy goes here" parameterId="secondaryButtonCopy" />}
    style={secondaryButtonStyle}
  />
);

export const BackgroundImage: FC<
  Pick<HeroProps, 'image' | 'video' | 'objectFit' | 'overlayOpacity' | 'overlayColor'>
> = ({ image, video, objectFit, overlayColor, overlayOpacity }) => {
  const imageUrl = getMediaUrl(image);
  const videoUrl = getMediaUrl(video);

  if (!imageUrl && !videoUrl) return null;
  return (
    <>
      {videoUrl && !Boolean(process.env.NEXT_PUBLIC_E2E_TEST) ? (
        <video
          autoPlay
          muted
          loop
          src={videoUrl}
          className={classNames(
            'absolute h-full w-full top-0 bottom-0 left-0 right-0 z-10',
            getObjectFitClass(objectFit)
          )}
        />
      ) : (
        <Image
          fill
          alt="hero-image"
          src={imageUrl}
          priority
          className={classNames('absolute top-0 bottom-0 left-0 right-0 z-10', getObjectFitClass(objectFit))}
        />
      )}
      <div
        className={classNames(
          'absolute top-0 bottom-0 left-0 right-0 z-10',
          getImageOverlayOpacityStyle(overlayOpacity),
          getImageOverlayColorStyle(overlayColor)
        )}
      />
    </>
  );
};

export const SideImage: FC<
  Pick<HeroProps, 'image' | 'video' | 'objectFit' | 'overlayOpacity' | 'overlayColor'> & {
    className?: string;
  }
> = ({ image, video, objectFit, overlayColor, overlayOpacity, className }) => {
  const imageUrl = getMediaUrl(image);
  const videoUrl = getMediaUrl(video);

  if (!imageUrl && !videoUrl) return null;

  return (
    <div className={classNames('relative shrink-0 relative w-full md:w-[500px] h-[500px]', className)}>
      {video ? (
        <video
          autoPlay
          muted
          loop
          src={videoUrl}
          className={classNames('rounded-lg md:h-[500px]', getObjectFitClass(objectFit))}
        />
      ) : (
        <Image
          fill
          alt="hero-image"
          src={imageUrl}
          className={classNames('rounded-lg md:h-[500px]', getObjectFitClass(objectFit))}
        />
      )}

      <div
        className={classNames(
          'absolute top-0 bottom-0 left-0 right-0 z-10',
          getImageOverlayOpacityStyle(overlayOpacity),
          getImageOverlayColorStyle(overlayColor)
        )}
      ></div>
    </div>
  );
};

export const Container: FC<PropsWithChildren<ContainerProps & { fullHeight?: boolean; className?: string }>> = ({
  children,
  className,
  fullHeight,
  containerVariant,
  marginBottom,
  marginTop,
  paddingBottom = PaddingSize.None,
  paddingTop = PaddingSize.None,
  backgroundType,
}) => {
  const isFluid = containerVariant === ContainerVariants.FluidContent;

  const Wrapper = isFluid ? ScreenContainer : Fragment;

  return (
    <BaseContainer
      containerVariant={containerVariant}
      marginBottom={marginBottom}
      marginTop={marginTop}
      paddingBottom={paddingBottom}
      paddingTop={paddingTop}
      backgroundType={backgroundType}
      backgroundClassName={classNames(className, {
        '!px-0': isFluid,
      })}
      className={classNames('hero relative', className, {
        'min-h-[500px]': !fullHeight,
        'min-h-[calc(100vh-64px)]': fullHeight,
      })}
    >
      <Wrapper {...(isFluid ? { className: classNames('xl:px-0 px-4', { 'h-full': fullHeight }) } : {})}>
        {children}
      </Wrapper>
    </BaseContainer>
  );
};
