import { FC, Fragment, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import Masonry from 'react-responsive-masonry';
import classNames from 'classnames';
import { UniformSlot, UniformText, UniformSlotWrapperComponentProps } from '@uniformdev/canvas-react';
import BaseContainer, { ContainerVariants, ScreenContainer } from '../../components/Container';
import AnimatedContainer, { AnimationVariant, DelayVariants } from '../../components/AnimatedContainer';
import { getTextClass } from '../../utilities/styling';
import Image from '../../canvas/Image';
import { getMediaUrl, isMediaAsset } from '../../utilities';
import { BaseImageGalleryProps } from './';
import { withoutContainer } from '../../hocs/withoutContainer';

type SlotWrapperComponentProps = Partial<Omit<UniformSlotWrapperComponentProps, 'slotName'>>;

const galleryConfig = {
  firstLineCount: 2,
  secondLineCount: 3,
  otherLinesCount: 4,
};

const BaseImageGallery: FC<BaseImageGalleryProps> = ({
  titleStyle: TitleTag = 'h1',
  items,
  maxItems,
  animationType,
  animationOrder,
  duration = 'medium',
  animationPreview,
  delay = 'none',
  component,
  styles,
  ...props
}) => {
  const [runAnimationToggle, setRunAnimationToggle] = useState(false);
  const delayValue = DelayVariants[delay];

  const imagesToDisplay = useMemo(
    () =>
      (items || []).map((image, index) => {
        const key = (() => {
          if ('_id' in image) return image?._id;
          if ('id' in image) return image?.id;
          return `image-${index}`;
        })();
        const imgSrc = getMediaUrl(image);
        const { defaultWidth, defaultHeight } = (() => {
          if (isMediaAsset(image)) {
            return {
              defaultWidth: image.fields?.width?.value?.toString(),
              defaultHeight: image.fields?.height?.value?.toString(),
            };
          }
          return { defaultWidth: undefined, defaultHeight: undefined };
        })();

        return (
          <Image
            key={key}
            width={defaultWidth?.toString()}
            height={defaultHeight?.toString()}
            alt={`Image ${index}`}
            src={imgSrc}
            component={component}
          />
        );
      }),
    [items, component]
  );

  useEffect(() => {
    setRunAnimationToggle(prevState => (animationPreview ? !prevState : prevState));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animationPreview]);

  const variant = component?.variant;

  const isFluid = variant === ContainerVariants.FluidContent;

  const Wrapper = isFluid ? ScreenContainer : Fragment;

  const getDelay = useCallback((index: number) => index / 10 + delayValue, [delayValue]);

  const GalleryInner = useCallback(
    ({ items }: SlotWrapperComponentProps) => {
      const imagesGroups = items?.reduce<ReactNode[][]>(
        (acc, item, index) => {
          if (maxItems && index >= maxItems) return acc;
          if (index < galleryConfig.firstLineCount) {
            const dynamicAnimationVariant = index ? AnimationVariant.FadeInLeft : AnimationVariant.FadeInRight;
            acc[0].push(
              animationType ? (
                <AnimatedContainer
                  animationVariant={animationType === 'fadeIn' ? AnimationVariant.FadeIn : dynamicAnimationVariant}
                  duration={duration}
                  delay={animationOrder === 'oneByOne' ? getDelay(index) : 0}
                >
                  {item}
                </AnimatedContainer>
              ) : (
                item
              )
            );
          } else if (index < galleryConfig.firstLineCount + galleryConfig.secondLineCount) {
            const dynamicAnimationVariant =
              (maxItems || items.length) < 6 ? AnimationVariant.FadeInBottom : AnimationVariant.FadeIn;
            acc[1].push(
              animationType ? (
                <AnimatedContainer
                  animationVariant={animationType === 'fadeIn' ? AnimationVariant.FadeIn : dynamicAnimationVariant}
                  duration={duration}
                  delay={animationOrder === 'oneByOne' ? getDelay(index) : 0}
                >
                  {item}
                </AnimatedContainer>
              ) : (
                item
              )
            );
          } else {
            acc[2].push(
              animationType ? (
                <AnimatedContainer
                  animationVariant={AnimationVariant.FadeIn}
                  duration={duration}
                  delay={animationOrder === 'oneByOne' ? getDelay(index) : 0}
                >
                  {item}
                </AnimatedContainer>
              ) : (
                item
              )
            );
          }
          return acc;
        },
        [[], [], []]
      );

      return (
        <div className="flex flex-col gap-6 mt-12">
          {imagesGroups?.map((images, lineIndex) =>
            images.length ? (
              <Masonry
                key={`line-${lineIndex}`}
                columnsCount={
                  lineIndex < 2 || images.length < galleryConfig.otherLinesCount
                    ? images.length
                    : galleryConfig.otherLinesCount
                }
                gutter="24px"
              >
                {images.map((img, ImageIndex) => (
                  <div key={`Img-${ImageIndex}`}>{img}</div>
                ))}
              </Masonry>
            ) : null
          )}
        </div>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [runAnimationToggle]
  );

  const isContentPlaceholder =
    !component?.slots?.images?.length || component?.slots?.images?.[0]?._id?.startsWith('placeholder');

  return (
    <BaseContainer {...props} containerVariant={component?.variant}>
      <Wrapper {...(isFluid ? { className: 'xl:px-0 px-4' } : {})}>
        <UniformText
          placeholder="Title goes here"
          parameterId="title"
          as={TitleTag}
          className={classNames('uppercase', getTextClass(TitleTag), styles?.title)}
        />
        <UniformText
          placeholder="Description goes here"
          parameterId="description"
          as="p"
          className={styles?.description}
        />
      </Wrapper>
      {!isContentPlaceholder ? (
        <UniformSlot name="images" wrapperComponent={GalleryInner} />
      ) : (
        <GalleryInner items={imagesToDisplay} />
      )}
    </BaseContainer>
  );
};

export default withoutContainer(BaseImageGallery);
