import { FC } from 'react';
import { registerUniformComponent, ComponentProps, UniformSlot } from '@uniformdev/canvas-react';
import { withoutContainer } from '@/hocs/withoutContainer';
import BaseHero, { BaseHeroProps, BaseHeroVariant } from '@/components/BaseHero';

export type HeroContainerProps = ComponentProps<BaseHeroProps>;

const HeroContainer: FC<HeroContainerProps> = ({ component, ...baseProps }) => {
  return (
    <BaseHero
      {...baseProps}
      variant={component?.variant}
      buttonsSlot={
        <div className="flex justify-center gap-2">
          <UniformSlot name="buttonsSection" />
        </div>
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
    type: 'heroContainer',
    component: withoutContainer(HeroContainer),
    variantId,
  });
});

export default HeroContainer;
