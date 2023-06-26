import { FC } from 'react';
import { registerUniformComponent, ComponentProps } from '@uniformdev/canvas-react';

type Props = ComponentProps<{
  colorStyle: Types.AvailableColor;
  thickness: number;
}>;

export enum SpacerVariants {
  Vertical = 'vertical',
}

const Spacer: FC<Props> = ({ thickness, component }) => (
  <div
    className="w-full"
    style={component?.variant === SpacerVariants.Vertical ? { width: thickness } : { height: thickness }}
  />
);

export default Spacer;

[undefined, SpacerVariants.Vertical].forEach(variantId => {
  registerUniformComponent({
    type: 'spacer',
    component: Spacer,
    variantId,
  });
});
