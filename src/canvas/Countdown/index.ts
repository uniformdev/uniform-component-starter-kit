import { registerUniformComponent, ComponentProps } from '@uniformdev/canvas-react';
import { Countdown } from './Countdown';

export type CountdownProps = ComponentProps<{
  targetDate: string;
  size?: Types.CountdownSize;
}>;

export enum CountdownVariant {
  LabelsUnder = 'labelsUnder',
  LabelsInBoxes = 'labelsInBoxes',
}

[undefined, CountdownVariant.LabelsUnder, CountdownVariant.LabelsInBoxes].forEach(variantId =>
  registerUniformComponent({
    type: 'countdown',
    component: Countdown,
    variantId,
  })
);

export default Countdown;
