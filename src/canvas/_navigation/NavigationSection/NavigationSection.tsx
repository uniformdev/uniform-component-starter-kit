import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-react';
import { NavigationSectionProps } from '.';

export const NavigationSection: FC<NavigationSectionProps> = ({ title }) => (
  <div>
    <span className="footer-title opacity-100 text-primary">{title}</span>
    <UniformSlot name="links" />
  </div>
);
