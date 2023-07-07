import type { Meta, StoryObj } from '@storybook/react';
import { UniformComposition } from '@uniformdev/canvas-react';
import Review, { ReviewVariant } from '@/canvas/Review';
import { createFakeCompositionData } from '../utils';

const meta: Meta<typeof Review> = {
  title: 'Review',
  component: Review,
};

export default meta;

type Story = StoryObj<typeof Review>;

const args = {
  reviewerName: 'Hector Gibbons',
  reviewerIcon:
    'https://res.cloudinary.com/uniformdev/image/upload/v1688563026/component-starter-kit/canvas-images/photo-1500648767791-00dcc994a43e_h3two9.avif',
  date: 'July 12, 2021',
  review: 5,
  reviewTitle: "Can't say enough good things",
  reviewDescription:
    "Blown away by how polished this icon pack is. Everything looks so consistent and each SVG is optimized out of the box so I can use it directly with confidence. It would take me several hours to create a single icon this good, so it's a steal at this price.",
};

const argTypes = {
  starsColor: { control: 'select', options: ['primary', 'secondary', 'accent', 'base-200', 'base-300'] },
};

export const Default: Story = {
  args,
  argTypes,
  render: args => {
    const fakeComposition = createFakeCompositionData('review', args, {});
    return (
      <UniformComposition data={fakeComposition}>
        <Review {...args} />,
      </UniformComposition>
    );
  },
};

export const MultiColumn: Story = {
  args,
  argTypes,
  render: args => {
    const fakeComposition = createFakeCompositionData('review', args, {});
    return (
      <UniformComposition data={fakeComposition}>
        <Review {...args} component={{ type: 'review', variant: ReviewVariant.MultiColumn }} />,
      </UniformComposition>
    );
  },
};
