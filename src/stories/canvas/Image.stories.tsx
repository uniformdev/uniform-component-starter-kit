import type { Meta, StoryObj } from '@storybook/react';
import { UniformComposition } from '@uniformdev/canvas-react';
import { UniformImage, UniformImageProps } from '@/canvas';
import { createFakeCompositionData } from '../utils';

const meta: Meta<typeof UniformImage> = {
  title: 'Image',
  component: UniformImage,
};

export default meta;
type Story = StoryObj<typeof UniformImage>;

const BASE_PROPS: Omit<UniformImageProps, 'component'> = {
  width: 200,
  height: 200,
  src: 'https://res.cloudinary.com/uniform-demos/image/upload/v1692276482/csk-marketing/Rectangle_7_2_uupdjo_wm94da.webp',
};

const renderStory = (args: UniformImageProps) => {
  const fakeComposition = createFakeCompositionData('image', args, {});
  return (
    <UniformComposition data={fakeComposition}>
      <UniformImage {...args} />
    </UniformComposition>
  );
};

export const Default: Story = {
  args: BASE_PROPS,
  render: renderStory,
};
