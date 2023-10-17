import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { Accordion } from './Accordion';

type Styles = {
  container?: string;
  title?: string;
  description?: string;
};

export type AccordionProps = ComponentProps<{
  title: string;
  description: string;
  styles?: Styles;
}>;

registerUniformComponent({
  type: 'accordion',
  component: Accordion,
});

export default Accordion;
