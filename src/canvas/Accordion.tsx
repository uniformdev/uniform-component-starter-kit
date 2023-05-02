import { FC } from 'react';
import { ComponentProps, UniformSlot, registerUniformComponent, UniformText } from '@uniformdev/canvas-react';

type Props = ComponentProps<{
  title: string;
  description: string;
}>;

const Accordion: FC<Props> = () => (
  <div className="text-secondary-content">
    <UniformText parameterId="title" as="p" className="text-3xl font-extrabold pb-4" />
    <UniformText parameterId="description" as="p" className="text-xl pb-6" />
    <UniformSlot name="items" />
  </div>
);

registerUniformComponent({
  type: 'accordion',
  component: Accordion,
});

export default Accordion;
