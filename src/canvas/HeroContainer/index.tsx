import { FC, useCallback } from 'react';
import {
  registerUniformComponent,
  ComponentProps,
  UniformSlot,
  UniformSlotWrapperComponentProps,
} from '@uniformdev/canvas-react';
import { withoutContainer } from '../../hocs/withoutContainer';
import BaseHero, {
  BaseHeroProps,
  BaseHeroVariant as HeroContainerVariant,
  useHeroAnimation,
} from '../../components/BaseHero';
import { AnimationVariant } from '../../components/AnimatedContainer';
import EmptyPlaceholder from '../../components/EmptyPlaceholder';
export type HeroContainerProps = ComponentProps<BaseHeroProps>;
export { BaseHeroVariant as HeroContainerVariant } from '../../components/BaseHero';

const HeroContainer: FC<HeroContainerProps> = ({ component, ...baseProps }) => {
  const { duration = 'medium', animationOrder, delay = 'none', animationType, animationPreview } = baseProps || {};

  const { ElementWrapper, getDelayValue } = useHeroAnimation({
    duration,
    animationOrder,
    delay,
    animationType,
    animationPreview,
  });

  const buttonSectionInner = useCallback(
    ({ items }: UniformSlotWrapperComponentProps) => {
      return items.map((button, index) => (
        <ElementWrapper
          key={`hero-button-${index}`}
          duration={duration}
          delay={getDelayValue(4.5 + 1.5 * index)}
          animationVariant={animationType === 'fadeIn' ? AnimationVariant.FadeIn : AnimationVariant.FadeInLeft}
        >
          {button}
        </ElementWrapper>
      ));
    },
    [ElementWrapper, animationType, duration, getDelayValue]
  );

  return (
    <BaseHero
      {...baseProps}
      variant={component?.variant}
      buttonsSlot={
        <div className="flex justify-center gap-2 flex-wrap">
          <UniformSlot
            name="buttonsSection"
            wrapperComponent={buttonSectionInner}
            emptyPlaceholder={<EmptyPlaceholder className="w-full !h-11" />}
          />
        </div>
      }
    />
  );
};

[
  undefined,
  HeroContainerVariant.ImageLeft,
  HeroContainerVariant.ImageRight,
  HeroContainerVariant.BackgroundImage,
  HeroContainerVariant.TwoColumns,
].forEach(variantId => {
  registerUniformComponent({
    type: 'heroContainer',
    component: withoutContainer(HeroContainer),
    variantId,
  });
});

export default withoutContainer(HeroContainer);
