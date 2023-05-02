import type { Meta, StoryObj } from '@storybook/react';
import { UniformComposition } from '@uniformdev/canvas-react';
import Hero, { HeroVariant, Props as HeroProps } from '@/canvas/Hero';
import { createFakeCompositionData } from '../utils';
import { buttonStyleOptions, titleStyleOptions } from '../constants';

const meta: Meta<typeof Hero> = {
  title: 'Hero',
  component: Hero,
};

export default meta;
type Story = StoryObj<typeof Hero>;

const BASE_PROPS: Omit<HeroProps, 'component'> = {
  eyebrowText: 'Hero',
  title: 'Are developers stuck with outdated tech and custom code to maintain?',
  titleStyle: 'h2',
  description:
    'Use this paragraph to share information about your company or brand. Make it as engaging as possible, and showcase your brand`s unique personality.',
  primaryButtonCopy: 'Home',
  primaryButtonLink: {
    path: '/',
  },
  image:
    'https://res.cloudinary.com/uniformdev/image/upload/v1681807373/component-starter-kit/canvas-images/Rectangle_7_2_uupdjo.avif',
  primaryButtonStyle: 'primary',
  secondaryButtonCopy: 'Components',
  secondaryButtonLink: {
    path: '/',
  },
  secondaryButtonStyle: 'link',
};

const argTypes = {
  titleStyle: { control: 'select', options: titleStyleOptions },
  primaryButtonStyle: { control: 'select', options: buttonStyleOptions },
  secondaryButtonStyle: { control: 'select', options: buttonStyleOptions },
};

const renderStory = (args: HeroProps) => {
  const fakeComposition = createFakeCompositionData('hero', args, {});
  return (
    <UniformComposition data={fakeComposition}>
      <Hero {...args} />
    </UniformComposition>
  );
};

export const Default: Story = {
  args: BASE_PROPS,
  argTypes,
  render: renderStory,
};

export const ImageLeft: Story = {
  args: {
    ...BASE_PROPS,
    component: {
      type: 'hero',
      variant: HeroVariant.ImageLeft,
    },
  },
  argTypes,
  render: renderStory,
};

export const ImageRight: Story = {
  args: {
    ...BASE_PROPS,
    component: {
      type: 'hero',
      variant: HeroVariant.ImageRight,
    },
  },
  argTypes,
  render: renderStory,
};

export const BackgroundImage: Story = {
  args: {
    ...BASE_PROPS,
    component: {
      type: 'hero',
      variant: HeroVariant.BackgroundImage,
    },
  },
  argTypes,
  render: renderStory,
};
