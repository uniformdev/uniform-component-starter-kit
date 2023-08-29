import type { Meta, StoryObj } from '@storybook/react';
import { UniformComposition } from '@uniformdev/canvas-react';
import { FeaturedCallout, FeaturedCalloutProps, FeaturedCalloutVariant } from '@/canvas';
import { createFakeCompositionData, createUniformParameter } from '../utils';
import { titleStyleOptions } from '../constants';

const meta: Meta<typeof FeaturedCallout> = {
  title: 'FeaturedCallout',
  component: FeaturedCallout,
};

export default meta;
type Story = StoryObj<typeof FeaturedCallout>;

const BASE_PROPS: Omit<FeaturedCalloutProps, 'component'> = {
  eyebrowText: 'OPTIONAL EYEBROW',
  title: 'Featured Callout With Icons and Image on the Left.',
  titleStyle: 'h1',
  description:
    'You can use this space to highlight your first benefit or a feature of your product. It can also contain an image or Illustration like in the example along with some bullet points.',
  image:
    'https://res.cloudinary.com/uniform-demos/image/upload/v1692276539/csk-marketing/Hero-Rectangle_nof1km_qy2ow6.png',
};

const argTypes = {
  titleStyle: { control: 'select', options: titleStyleOptions },
};

const FEATURES = [
  {
    icon: 'https://res.cloudinary.com/uniform-demos/image/upload/v1692276689/csk-icons/icon-understand_eytz6h_cgirir.svg',
    title: 'Understand your customers',
    link: {
      path: '/your-link',
    },
    description: 'Then explain the first point breifly in one or two lines.',
  },
  {
    icon: 'https://res.cloudinary.com/uniform-demos/image/upload/v1692276740/csk-icons/icon-improve_jkerfy_z0qxiy.svg',
    title: 'Improve acquisition',
    description: 'Here you can add a second point to explain the benefits of your product.',
  },
  {
    icon: 'https://res.cloudinary.com/uniform-demos/image/upload/v1692276654/csk-icons/icon-drive_le2khu_i6jwy8.svg',
    title: 'Engage your customers',
    description: 'Here you can add a third point to explain the benefits of your product.',
  },
];

const renderStory = (args: FeaturedCalloutProps) => {
  const fakeComposition = createFakeCompositionData('featureCallout', args, {
    feature: FEATURES.map(feature => ({
      type: 'feature',
      parameters: createUniformParameter(feature),
    })),
  });
  return (
    <UniformComposition data={fakeComposition}>
      <FeaturedCallout {...args} />
    </UniformComposition>
  );
};

export const Default: Story = {
  args: BASE_PROPS,
  argTypes,
  render: renderStory,
};

export const ImageRight: Story = {
  args: {
    ...BASE_PROPS,
    component: {
      type: 'featureCallout',
      variant: FeaturedCalloutVariant.ImageRight,
    },
  },
  argTypes,
  render: renderStory,
};
