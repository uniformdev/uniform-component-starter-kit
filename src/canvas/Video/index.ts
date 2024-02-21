import { registerUniformComponent, ComponentProps } from '@uniformdev/canvas-react';
import type { Asset } from '@uniformdev/assets';
import { Video } from './Video';

export type VideoProps = ComponentProps<{
  url: Types.ProjectMapLink;
  autoPlay?: boolean;
  loop?: boolean;
  controls: boolean;
  lazyLoad?: boolean;
  placeholderImage?: string | Asset;
  muted: boolean;
}>;

registerUniformComponent({
  type: 'video',
  component: Video,
});

export default Video;
