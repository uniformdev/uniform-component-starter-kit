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
  width: '1600',
  height: '689',
  src: 'https://res.cloudinary.com/uniform-demos/image/upload/v1/csk-marketing/Rectangle_7_2_uupdjo_wm94da',
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
