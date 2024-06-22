import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import type { Asset } from '@uniformdev/assets';
import { Hotspot } from './Hotspot';

export type HotspotProps = ComponentProps<{
  icon?: Asset[];
  iconHorizontalPosition?: string;
  iconVerticalPosition?: string;

  tooltipPosition?: Types.Position;
  tooltipWidth?: string;
  tooltipBackgroundColor?: Types.ThemeColorsValues | string;
  withTooltipShadow?: boolean;
}>;

registerUniformComponent({
  type: 'hotspot',
  component: Hotspot,
});

export default Hotspot;
