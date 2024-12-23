import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import type { Asset } from '@uniformdev/assets';
import { Hotspots } from './Hotspots';

export type HotspotsProps = ComponentProps<{
  backgroundImage?: Asset[];
  alt?: string;

  fill?: boolean;
  height?: string;
  width?: string;
  objectFit?: Types.AvailableObjectFit;
}>;

registerUniformComponent({
  type: 'hotspots',
  component: Hotspots,
});

export default Hotspots;
