import createComponentResolver, { ComponentMapping } from '@uniformdev/theme-pack/utils/createComponentResolver';
import { cskComponentsMapping } from '@/components/canvas';
import { customComponentsMapping } from '@/components/custom-canvas';

const componentsMapping: ComponentMapping = {
  ...cskComponentsMapping,
  ...customComponentsMapping,
};

export const componentResolver = createComponentResolver(componentsMapping);
