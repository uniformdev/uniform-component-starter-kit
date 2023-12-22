import type { Meta, StoryObj } from '@storybook/react';
import { UniformComposition, ComponentProps } from '@uniformdev/canvas-react';
import { Carousel, CarouselVariants } from '@/canvas';
import { createFakeCompositionData, createUniformParameter } from '../utils';

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
      "Use this paragraph to share information about your company or brand. Make it as engaging as possible, and showcase your brand's unique personality.",
    primaryButtonCopy: 'Home',
    primaryButtonLink: {
      path: '/',
    },
    image: 'https://res.cloudinary.com/uniform-demos/image/upload/v1/csk-marketing/Rectangle_7_2_uupdjo_wm94da',
    primaryButtonStyle: 'primary',
    secondaryButtonCopy: 'Components',
    secondaryButtonLink: {
      path: '/',
    },
    secondaryButtonStyle: 'link',
    type: 'hero',
    textColorVariant: 'Dark',
  },
  {
    eyebrowText: 'Hero',
    title: '2. Are developers stuck with outdated tech and custom code to maintain?',
    titleStyle: 'h2',
    description:
      "Use this paragraph to share information about your company or brand. Make it as engaging as possible, and showcase your brand's unique personality.",
    primaryButtonCopy: 'Home',
    primaryButtonLink: {
      path: '/',
    },
    image: 'https://res.cloudinary.com/uniform-demos/image/upload/v1/csk-marketing/Rectangle_7_2_uupdjo_wm94da',
    primaryButtonStyle: 'primary',
    secondaryButtonCopy: 'Components',
    secondaryButtonLink: {
      path: '/',
    },
    secondaryButtonStyle: 'link',
    type: 'hero',
    textColorVariant: 'Dark',
  },
  {
    eyebrowText: 'Hero',
    title: '3. Are developers stuck with outdated tech and custom code to maintain?',
    titleStyle: 'h2',
    description:
      "Use this paragraph to share information about your company or brand. Make it as engaging as possible, and showcase your brand's unique personality.",
    primaryButtonCopy: 'Home',
    primaryButtonLink: {
      path: '/',
    },
    image: 'https://res.cloudinary.com/uniform-demos/image/upload/v1/csk-marketing/Rectangle_7_2_uupdjo_wm94da',
    primaryButtonStyle: 'primary',
    secondaryButtonCopy: 'Components',
    secondaryButtonLink: {
      path: '/',
    },
    secondaryButtonStyle: 'link',
    type: 'hero',
    textColorVariant: 'Dark',
  },
];

const IMAGES_PROPS = [
  {
    type: 'image',
    src: 'https://res.cloudinary.com/uniform-demos/image/upload/v1/csk-marketing/Rectangle_7_2_uupdjo_wm94da',
    width: '2000',
    height: '2000',
  },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/uniform-demos/image/upload/v1/csk-marketing/Rectangle_7_2_uupdjo_wm94da',
    width: '2000',
    height: '2000',
  },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/uniform-demos/image/upload/v1/csk-marketing/Rectangle_7_2_uupdjo_wm94da',
    width: '2000',
    height: '2000',
  },
];

const argTypes = {};

const renderStory = (args: ComponentProps) => {
  const fakeComposition = createFakeCompositionData('carousel', args, { ...args.component.slots });
  return (
    <UniformComposition data={fakeComposition}>
      <Carousel {...args} />
    </UniformComposition>
  );
};

export const Default: Story = {
  args: {
    component: {
      type: 'carousel',
      variant: undefined,
      slots: {
        carouselItem: HEROS_PROPS.map(item => ({
          type: 'hero',
          parameters: createUniformParameter(item),
        })),
      },
    },
  },
  argTypes,
  render: renderStory,
};

export const ImageGallery: Story = {
  args: {
    component: {
      type: 'carousel',
      variant: CarouselVariants.ImageGallery,
      slots: {
        carouselItem: IMAGES_PROPS.map(item => ({
          type: 'image',
          parameters: createUniformParameter(item),
        })),
      },
    },
  },
  argTypes,
  render: renderStory,
};
