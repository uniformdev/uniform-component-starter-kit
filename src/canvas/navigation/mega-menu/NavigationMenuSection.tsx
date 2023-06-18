import { FC } from 'react';

import { ComponentProps, UniformSlot, registerUniformComponent } from '@uniformdev/canvas-react';

type LinkProps = ComponentProps<{
  title: string;
}>;

const NavigationMenuSection: FC<LinkProps> = ({ title }) => (
  <div>
    <p className="text-primary-content font-bold">{title}</p>
    <UniformSlot name="links" />
  </div>
);

registerUniformComponent({
  type: 'navigationMenuSection',
  component: NavigationMenuSection,
});
