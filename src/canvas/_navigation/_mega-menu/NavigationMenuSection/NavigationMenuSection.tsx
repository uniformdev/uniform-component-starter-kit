import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-react';
import { NavigationMenuSectionProps } from '.';

export const NavigationMenuSection: FC<NavigationMenuSectionProps> = ({ title }) => (
  <div>
    <p className="text-primary-content font-bold">{title}</p>
    <UniformSlot name="links" />
  </div>
);
