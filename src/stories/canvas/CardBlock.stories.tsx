import type { Meta, StoryObj } from '@storybook/react';
import { UniformComposition } from '@uniformdev/canvas-react';
import CardBlock, { CardBlockProps } from '@/canvas/CardBlock';
import { createFakeCompositionData, createUniformParameter } from '../utils';
import { buttonStyleOptions, titleStyleOptions } from '../constants';

const meta: Meta<typeof CardBlock> = {
  title: 'CardBlock',
  component: CardBlock,
};

export default meta;
type Story = StoryObj<typeof CardBlock>;

const BASE_PROPS: Omit<CardBlockProps, 'component'> = {
  title: 'Leverage existing technology investments ',
  titleStyle: 'h2',
  buttonCopy: 'Home',
  buttonLink: {
    path: '/',
  },
  buttonStyle: 'primary',
};

const argTypes = {
  titleStyle: { control: 'select', options: titleStyleOptions },
  buttonStyle: { control: 'select', options: buttonStyleOptions },
};

const BLOCK_CARDS = [
  {
    image:
      'https://res.cloudinary.com/uniformdev/image/upload/v1681808641/component-starter-kit/canvas-images/Hero-Rectangle_nof1km.png',
    title: 'Leverage existing technology investments ',
    description:
      'Use this paragraph to share information about your company or brand. Make it as engaging as possible.',
  },
  {
    image:
      'https://res.cloudinary.com/uniformdev/image/upload/v1681808641/component-starter-kit/canvas-images/Hero-Rectangle_nof1km.png',
    title: 'Leverage existing technology investments ',
    description:
      'Use this paragraph to share information about your company or brand. Make it as engaging as possible.',
  },
  {
    image:
      'https://res.cloudinary.com/uniformdev/image/upload/v1681808641/component-starter-kit/canvas-images/Hero-Rectangle_nof1km.png',
    title: 'Leverage existing technology investments ',
    description:
      'Use this paragraph to share information about your company or brand. Make it as engaging as possible.',
  },
];

const renderStory = (args: CardBlockProps) => {
  const fakeComposition = createFakeCompositionData('cardBlock', args, {
    cardBlockInner: BLOCK_CARDS.map(card => ({
      type: 'card',
      parameters: createUniformParameter(card),
    })),
  });
  return (
    <UniformComposition data={fakeComposition}>
      <CardBlock {...args} />
    </UniformComposition>
  );
};

export const Default: Story = {
  args: BASE_PROPS,
  argTypes,
  render: renderStory,
};
