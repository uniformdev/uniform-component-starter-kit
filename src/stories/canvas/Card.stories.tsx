import type { Meta, StoryObj, ArgTypes } from '@storybook/react';
import { UniformComposition } from '@uniformdev/canvas-react';
import { Card, CardProps, CardVariants } from '@/canvas';
import { createFakeCompositionData } from '../utils';
import { buttonStyleOptions } from '../constants';

const badgeStyleOptions = ['primary', 'secondary', 'accent', 'outline'];

const badgeSizeOptions = ['xs', 'sm', 'md', 'lg'];

const meta: Meta<typeof Card> = {
  title: 'Card',
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

const BASE_PROPS: Omit<CardProps, 'component'> = {
  title: 'Leverage existing technology investments ',
  description: 'Use this paragraph to share information about your company or brand. Make it as engaging as possible.',
  image:
    'https://res.cloudinary.com/uniform-demos/image/upload/v1692276539/csk-marketing/Hero-Rectangle_nof1km_qy2ow6.png',

  badge: 'New',
  badgeStyle: 'primary',
  badgeSize: 'sm',
  buttonCopy: 'Home',
  buttonLink: {
    path: '/',
  },
  buttonStyle: 'primary',
  lineCountRestriction: 'none',
  textColorVariant: 'Dark',
};

const argTypes: Partial<ArgTypes<CardProps>> = {
  badgeStyle: { control: 'select', options: badgeStyleOptions },
  buttonStyle: { control: 'select', options: buttonStyleOptions },
  badgeSize: { control: 'select', options: badgeSizeOptions },
};

const renderStory = (args: CardProps) => {
  const fakeComposition = createFakeCompositionData('card', args, {});
  return (
    <UniformComposition data={fakeComposition}>
      <Card {...args} />
    </UniformComposition>
  );
};

export const Default: Story = {
  args: BASE_PROPS,
  argTypes,
  render: renderStory,
};

export const BackgroundImage: Story = {
  args: {
    ...BASE_PROPS,
    textColorVariant: 'Light',
    component: {
      type: 'card',
      variant: CardVariants.BackgroundImage,
    },
  },
  argTypes,
  render: renderStory,
};

export const Featured: Story = {
  args: {
    ...BASE_PROPS,
    component: {
      type: 'card',
      variant: CardVariants.Featured,
    },
  },
  argTypes,
  render: renderStory,
};
