import { registerUniformComponent, ComponentProps } from '@uniformdev/canvas-react';
import { Page } from './Page';

export type PageProps = ComponentProps;

['page', 'productDetailsPage', 'landingPage', 'productCategoryPage', 'articleDetailsPage'].forEach(pageType => {
  registerUniformComponent({
    type: pageType,
    component: Page,
  });
});

export default Page;
