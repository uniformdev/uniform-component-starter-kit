import type { Meta, StoryObj } from '@storybook/react';
import { UniformComposition } from '@uniformdev/canvas-react';
import Carousel, { Props as CarouselProps } from '@/canvas/Carousel';
import { createFakeCompositionData, createUniformParameter } from '../utils';
import { titleStyleOptions } from '../constants';

const meta: Meta<typeof Carousel> = {
  title: 'Carousel',
  component: Carousel,
};

export default meta;
type Story = StoryObj<typeof Carousel>;

const HEROS_PROPS = [
  {
    eyebrowText: 'Hero',
    title: '1. Are developers stuck with outdated tech and custom code to maintain?',
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
    type: 'hero',
  },
  {
    eyebrowText: 'Hero',
    title: '2. Are developers stuck with outdated tech and custom code to maintain?',
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
    type: 'hero',
  },
  {
    eyebrowText: 'Hero',
    title: '3. Are developers stuck with outdated tech and custom code to maintain?',
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
    type: 'hero',
  },
];

const BASE_PROPS: CarouselProps = {
  title: 'Carousel',
  description: 'Use carousel to display some information in a slideshow.',
  titleStyle: 'h2',
  component: {
    type: 'carousel',
    slots: {
      carouselItem: HEROS_PROPS,
    },
  },
};

const argTypes = {
  titleStyle: { control: 'select', options: titleStyleOptions },
};

const renderStory = (args: CarouselProps) => {
  const fakeComposition = createFakeCompositionData('hero', args, {
    carouselItem: HEROS_PROPS.map(item => ({
      type: 'hero',
      parameters: createUniformParameter(item),
    })),
  });
  return (
    <UniformComposition data={fakeComposition}>
      <Carousel {...args} />
    </UniformComposition>
  );
};

export const Default: Story = {
  args: BASE_PROPS,
  argTypes,
  render: renderStory,
};
