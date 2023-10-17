import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { AccordionItem } from './AccordionItem';

type Styles = {
  container?: string;
  toggleButton?: string;
  title?: string;
  description?: string;
};

export type AccordionItemProps = ComponentProps<{
  title: string;
  description: string;
  styles?: Styles;
}>;

registerUniformComponent({
  type: 'accordionItem',
  component: AccordionItem,
});

export default AccordionItem;
export * from './decorator';
