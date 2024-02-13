import { CSSProperties } from 'react';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { AdvancedContainer } from './AdvancedContainer';
import { withoutContainer } from '../../../hocs/withoutContainer';
import { PaddingSize } from '../../../utilities/styling';

export enum AdvancedContainerVariants {
  FluidContent = 'fluidContent',
}

export type AdvancedContainerProps = ComponentProps<{
  title?: string;
  backgroundColor?: Types.ThemeColorsValues | string;
  paddingTop?: PaddingSize;
  paddingBottom?: PaddingSize;
  marginTop?: PaddingSize;
  marginBottom?: PaddingSize;
  style: CSSProperties;
}>;

[undefined, AdvancedContainerVariants.FluidContent].forEach(variantId => {
  registerUniformComponent({
    type: 'advancedContainer',
    component: withoutContainer(AdvancedContainer, { withoutPaddings: true }),
    variantId,
  });
});

export default AdvancedContainer;
