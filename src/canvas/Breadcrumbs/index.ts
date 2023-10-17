import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { Breadcrumbs } from './Breadcrumbs';

export type BreadcrumbSeparator = 'slash' | 'chevron' | 'none';

type Styles = {
  container?: string;
};
export type BreadcrumbsProps = ComponentProps<{
  colorStyle: Types.AvailableColor;
  displayRootNode: boolean;
  displayPlaceholderNodes: boolean;
  separator: BreadcrumbSeparator;
  styles?: Styles;
}>;

registerUniformComponent({
  type: 'breadcrumbs',
  component: Breadcrumbs,
});

export default Breadcrumbs;
