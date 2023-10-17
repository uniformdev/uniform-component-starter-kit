import { registerUniformComponent, ComponentProps } from '@uniformdev/canvas-react';
import { Video } from './Video';

export type VideoProps = ComponentProps<{
  url: Types.ProjectMapLink;
  loop?: boolean;
  controls: boolean;
  lazyLoad?: boolean;
  placeholderImage?: string;
  muted: boolean;
}>;

registerUniformComponent({
  type: 'video',
  component: Video,
});

export default Video;
