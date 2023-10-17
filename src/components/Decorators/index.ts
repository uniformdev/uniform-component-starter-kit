import { BackgroundDecorator, WithoutContainerDecorator } from '../BasePage';
import { AccordionItemDecorator } from '../../canvas/AccordionItem';
import { CardDecorator } from '../../canvas/Card';
import { FeatureDecorator } from '../../canvas/Feature';

// Basic Decorators Set for the Component Starter Kit
// Activate visual editing doc: https://docs.uniform.app/docs/guides/composition/visual-editing/activate-visual-editing
const CSKDecorators = [
  AccordionItemDecorator,
  CardDecorator,
  FeatureDecorator,
  WithoutContainerDecorator,
  BackgroundDecorator,
];

export default CSKDecorators;
