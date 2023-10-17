import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps, UniformComposition } from '@uniformdev/canvas-react';
import { CardBlock, CardBlockProps, CardBlockVariants } from '@/canvas';
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
  textColorVariant: 'Dark',
};

const argTypes = {
  titleStyle: { control: 'select', options: titleStyleOptions },
  buttonStyle: { control: 'select', options: buttonStyleOptions },
};

const BLOCK_CARDS = [
  {
    image:
      'https://res.cloudinary.com/uniform-demos/image/upload/v1692276539/csk-marketing/Hero-Rectangle_nof1km_qy2ow6.png',
    title: 'Leverage existing technology investments ',
    description:
      'Use this paragraph to share information about your company or brand. Make it as engaging as possible.',
  },
  {
    image:
      'https://res.cloudinary.com/uniform-demos/image/upload/v1692276539/csk-marketing/Hero-Rectangle_nof1km_qy2ow6.png',
    title: 'Leverage existing technology investments ',
    description:
      'Use this paragraph to share information about your company or brand. Make it as engaging as possible.',
  },
  {
    image:
      'https://res.cloudinary.com/uniform-demos/image/upload/v1692276539/csk-marketing/Hero-Rectangle_nof1km_qy2ow6.png',
    title: 'Leverage existing technology investments ',
    description:
      'Use this paragraph to share information about your company or brand. Make it as engaging as possible.',
  },
];

const CAROUSEL_CARDS = [
  ...BLOCK_CARDS,
  {
    image:
      'https://res.cloudinary.com/uniform-demos/image/upload/v1692276539/csk-marketing/Hero-Rectangle_nof1km_qy2ow6.png',
    title: 'Leverage existing technology investments ',
    description:
      'Use this paragraph to share information about your company or brand. Make it as engaging as possible.',
  },
];

const renderStory = (args: ComponentProps & Omit<CardBlockProps, 'component'>) => {
  const fakeComposition = createFakeCompositionData('cardBlock', args, { ...args.component.slots });
  return (
    <UniformComposition data={fakeComposition}>
      <CardBlock {...args} />
    </UniformComposition>
  );
};

const renderStoryCardBlockCarousel = (args: ComponentProps & Omit<CardBlockProps, 'component'>) => {
  const fakeComposition = createFakeCompositionData('cardBlock', args, { ...args.component.slots });
  return (
    <UniformComposition data={fakeComposition}>
      <CardBlock {...args} component={{ type: 'cardBlock', variant: CardBlockVariants.Carousel }} />
    </UniformComposition>
  );
};

export const Default: Story = {
  args: {
    ...BASE_PROPS,
    component: {
      type: 'cardBlock',
      variant: undefined,
      slots: {
        cardBlockInner: BLOCK_CARDS.map(card => ({
          type: 'card',
          parameters: createUniformParameter(card),
        })),
      },
    },
  },
  argTypes,
  render: renderStory,
};

export const CarouselBlock: Story = {
  args: {
    ...BASE_PROPS,
    component: {
      type: 'cardBlock',
      variant: CardBlockVariants.Carousel,
      slots: {
        cardBlockInner: CAROUSEL_CARDS.map(card => ({
          type: 'card',
          parameters: createUniformParameter(card),
        })),
      },
    },
  },
  argTypes,
  render: renderStoryCardBlockCarousel,
};
