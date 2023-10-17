import { registerUniformComponent, ComponentProps } from '@uniformdev/canvas-react';
import { withoutContainer } from '../../hocs/withoutContainer';
import { Spacer } from './Spacer';

export type SpacerProps = ComponentProps<{
  colorStyle: Types.AvailableColor;
  thickness: number;
}>;

export enum SpacerVariants {
  Vertical = 'vertical',
}

[undefined, SpacerVariants.Vertical].forEach(variantId => {
  registerUniformComponent({
    type: 'spacer',
    component: withoutContainer(Spacer),
    variantId,
  });
});

export default withoutContainer(Spacer);
