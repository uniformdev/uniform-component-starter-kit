import type { Meta, StoryObj } from '@storybook/react';
import { UniformComposition } from '@uniformdev/canvas-react';
import { Testimonial, TestimonialVariant } from '@/canvas';
import { createFakeCompositionData } from '../utils';

const meta: Meta<typeof Testimonial> = {
  title: 'Testimonial',
  component: Testimonial,
};

export default meta;

type Story = StoryObj<typeof Testimonial>;

const args = {
  personName: 'Hector Gibbons',
  picture:
    'https://res.cloudinary.com/uniform-demos/image/upload/v1692279682/csk-marketing/photo-1500648767791-00dcc994a43e_h3two9_jylmf3.jpg',
  logo: 'https://res.cloudinary.com/uniform-demos/image/upload/v1692277568/csk-icons/Uniform_Logo_Black_hb6a69_kxy6lz.svg',
  description:
    "Blown away by how polished this icon pack is. Everything looks so consistent and each SVG is optimized out of the box so I can use it directly with confidence. It would take me several hours to create a single icon this good, so it's a steal at this price.",
};

export const Default: Story = {
  args,
  render: args => {
    const fakeComposition = createFakeCompositionData('testimonial', args, {});
    return (
      <UniformComposition data={fakeComposition}>
        <Testimonial {...args} />
      </UniformComposition>
    );
  },
};

export const CardWrapped: Story = {
  args,
  render: args => {
    const fakeComposition = createFakeCompositionData('testimonial', args, {});
    return (
      <UniformComposition data={fakeComposition}>
        <Testimonial {...args} component={{ type: 'testimonial', variant: TestimonialVariant.CardWrapped }} />
      </UniformComposition>
    );
  },
};
