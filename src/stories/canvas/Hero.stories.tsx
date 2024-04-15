import type { Meta, StoryObj } from '@storybook/react';
import { UniformComposition } from '@uniformdev/canvas-react';
import { Hero, HeroProps, HeroVariant } from '@/canvas';
import { BackgroundTypes, PaddingSize } from '@/utilities/styling';
import { createFakeCompositionData } from '../utils';
import { animationOrder, animationType, buttonStyleOptions, titleStyleOptions } from '../constants';

const meta: Meta<typeof Hero> = {
  title: 'Hero',
  component: Hero,
};

export default meta;
type Story = StoryObj<typeof Hero>;

const BASE_PROPS: Omit<HeroProps, 'component' | 'children'> = {
  eyebrowText: 'Hero',
  title: 'Are developers stuck with outdated tech and custom code to maintain?',
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
  fullHeight: false,
  animationType: 'flyIn',
  animationOrder: 'oneByOne',
  duration: 'slow',
  marginTop: PaddingSize.Medium,
  marginBottom: PaddingSize.Medium,
  backgroundType: BackgroundTypes.Light,
  containerVariant: '',
  paddingTop: PaddingSize.Medium,
  paddingBottom: PaddingSize.Medium,
  textColorVariant: 'Dark',
};

const argTypes = {
  titleStyle: { control: 'select', options: titleStyleOptions },
  primaryButtonStyle: { control: 'select', options: buttonStyleOptions },
  secondaryButtonStyle: { control: 'select', options: buttonStyleOptions },
  animationType: { control: 'select', options: animationType },
  animationOrder: { control: 'select', options: animationOrder },
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
    textColorVariant: 'Light',
    component: {
      type: 'hero',
      variant: HeroVariant.BackgroundImage,
    },
  },
  argTypes,
  render: renderStory,
};

export const BackgroundVideo: Story = {
  args: {
    ...BASE_PROPS,
    textColorVariant: 'Light',
    video: 'https://res.cloudinary.com/uniform-demos/video/upload/v1693387616/videos/pexels-mizuno-rojas.mp4',
    containerVariant: 'fluidContent',
    objectFit: 'cover',
    component: {
      type: 'hero',
      variant: HeroVariant.BackgroundImage,
    },
  },
  argTypes,
  render: renderStory,
};

export const TwoColumns: Story = {
  args: {
    ...BASE_PROPS,
    textColorVariant: 'Light',
    component: {
      type: 'hero',
      variant: HeroVariant.TwoColumns,
    },
  },
  argTypes,
  render: renderStory,
};
