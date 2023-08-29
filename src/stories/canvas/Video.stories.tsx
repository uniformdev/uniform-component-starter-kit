import type { Meta, StoryObj } from '@storybook/react';
import { UniformComposition } from '@uniformdev/canvas-react';
import { Video, VideoProps } from '@/canvas';
import { Container } from '@/components';
import { BackgroundTypes } from '@/utilities/styling';
import { createFakeCompositionData } from '../utils';

const meta: Meta<typeof Video> = {
  title: 'Video',
  component: Video,
};

export default meta;
type Story = StoryObj<typeof Video>;

const BASE_PROPS: Omit<VideoProps, 'component'> = {
  url: {
    path: 'https://www.youtube.com/watch?v=KN7krvnm2uM',
  },
  controls: true,
  muted: true,
  lazyLoad: true,
  loop: true,
};

const renderStory = (args: VideoProps) => {
  const fakeComposition = createFakeCompositionData('video', args, {});
  return (
    <UniformComposition data={fakeComposition}>
      <Container backgroundType={BackgroundTypes.Light}>
        <Video {...args} />
      </Container>
    </UniformComposition>
  );
};

export const Default: Story = {
  args: BASE_PROPS,
  render: renderStory,
};
