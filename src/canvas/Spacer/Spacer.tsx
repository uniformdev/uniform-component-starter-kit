import { FC } from 'react';
import { SpacerProps, SpacerVariants } from '.';

export const Spacer: FC<SpacerProps> = ({ thickness, component }) => (
  <div
    className="w-full"
    style={component?.variant === SpacerVariants.Horizontal ? { width: thickness } : { height: thickness }}
  />
);
