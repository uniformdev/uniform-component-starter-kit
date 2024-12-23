import { FC } from 'react';
import { registerUniformComponent, useUniformContextualEditingState, ComponentProps } from '@uniformdev/canvas-react';
import { withoutContainer } from '../../hocs/withoutContainer';
import { useHeroAnimation } from '../../components/BaseHero/animation';
import BaseHero, { BaseHeroProps, BaseHeroVariant } from '../../components/BaseHero';
import { AnimationVariant } from '../../components/AnimatedContainer';
import { PrimaryButton, SecondaryButton } from './atoms';

export { BaseHeroVariant as HeroVariant } from '../../components/BaseHero';

export type HeroProps = ComponentProps<
  BaseHeroProps & {
    primaryButtonCopy: string;
    primaryButtonLink: Types.ProjectMapLink;
    primaryButtonStyle: Types.ButtonStyles;
    primaryButtonAnimationType?: Types.AnimationType;
    secondaryButtonCopy: string;
    secondaryButtonLink: Types.ProjectMapLink;
    secondaryButtonStyle: Types.ButtonStyles;
    secondaryButtonAnimationType?: Types.AnimationType;
  }
>;

const Hero: FC<HeroProps> = ({
  primaryButtonCopy,
  primaryButtonAnimationType,
  primaryButtonLink,
  primaryButtonStyle,
  secondaryButtonCopy,
  secondaryButtonAnimationType,
  secondaryButtonLink,
  secondaryButtonStyle,
  component,
  ...baseProps
}) => {
  const { previewMode } = useUniformContextualEditingState();
  const isContextualEditing = previewMode === 'editor';
  const { duration = 'medium', animationOrder, delay = 'none', animationType, animationPreview } = baseProps || {};

  const { ElementWrapper, getDelayValue } = useHeroAnimation({
    duration,
    animationOrder,
    delay,
    animationType,
    animationPreview,
  });

  return (
    <BaseHero
      {...baseProps}
      variant={component?.variant}
      buttonsSlot={
        <>
          {(Boolean(primaryButtonCopy) || isContextualEditing) && (
            <ElementWrapper
              duration={duration}
              delay={getDelayValue(4.5)}
              animationVariant={animationType === 'fadeIn' ? AnimationVariant.FadeIn : AnimationVariant.FadeInLeft}
            >
              <PrimaryButton
                animationType={primaryButtonAnimationType}
                primaryButtonLink={primaryButtonLink}
                primaryButtonStyle={primaryButtonStyle}
              />
            </ElementWrapper>
          )}
          {(Boolean(secondaryButtonCopy) || isContextualEditing) && (
            <ElementWrapper
              duration={duration}
              delay={getDelayValue(6)}
              animationVariant={animationType === 'fadeIn' ? AnimationVariant.FadeIn : AnimationVariant.FadeInLeft}
            >
              <SecondaryButton
                animationType={secondaryButtonAnimationType}
                secondaryButtonLink={secondaryButtonLink}
                secondaryButtonStyle={secondaryButtonStyle}
              />
            </ElementWrapper>
          )}
        </>
      }
    />
  );
};

[
  undefined,
  BaseHeroVariant.ImageLeft,
  BaseHeroVariant.ImageRight,
  BaseHeroVariant.BackgroundImage,
  BaseHeroVariant.TwoColumns,
].forEach(variantId => {
  registerUniformComponent({
    type: 'hero',
    component: withoutContainer(Hero),
    variantId,
  });
});

export default withoutContainer(Hero);
