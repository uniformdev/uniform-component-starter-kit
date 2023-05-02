import type { Meta, StoryObj } from '@storybook/react';
import { UniformComposition } from '@uniformdev/canvas-react';
import UniformImage, { Props as ImageProps } from '@/canvas/Image';
import { createFakeCompositionData } from '../utils';

const meta: Meta<typeof UniformImage> = {
  title: 'Image',
  component: UniformImage,
};

export default meta;
type Story = StoryObj<typeof UniformImage>;

const BASE_PROPS: Omit<ImageProps, 'component'> = {
  width: 200,
  height: 200,
  src: 'https://res.cloudinary.com/uniformdev/image/upload/v1681807373/component-starter-kit/canvas-images/Rectangle_7_2_uupdjo.avif',
};

const renderStory = (args: ImageProps) => {
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
