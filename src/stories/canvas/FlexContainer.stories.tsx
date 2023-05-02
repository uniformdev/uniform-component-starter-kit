import type { Meta, StoryObj } from '@storybook/react';
import { UniformComposition } from '@uniformdev/canvas-react';
import FlexContainer, { Props as FlexContainerProps } from '@/canvas/containers/FlexContainer';
import { createFakeCompositionData, createUniformParameter } from '../utils';

const flexDirectionOptions = ['row', 'row-reverse', 'column', 'column-reverse'];

const flexWrapOptions = ['nowrap', 'wrap', 'wrap-reverse'];

const justifyContentOptions = [
  'normal',
  'flex-start',
  'flex-end',
  'center',
  'space-between',
  'space-around',
  'space-evenly',
  'stretch',
];

const alignItemsOptions = ['normal', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch'];

const meta: Meta<typeof FlexContainer> = {
  title: 'FlexContainer',
  component: FlexContainer,
};

export default meta;
type Story = StoryObj<typeof FlexContainer>;

const BASE_PROPS: Omit<FlexContainerProps, 'component'> = {
  direction: 'row',
  flexWrap: 'nowrap',
  justifyContent: 'normal',
  alignItems: 'normal',
};

const argTypes = {
  direction: { control: 'select', options: flexDirectionOptions },
  flexWrap: { control: 'select', options: flexWrapOptions },
  justifyContent: { control: 'select', options: justifyContentOptions },
  alignItems: { control: 'select', options: alignItemsOptions },
};

const CARDS = [
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

const renderStory = (args: FlexContainerProps) => {
  const fakeComposition = createFakeCompositionData('flexContainer', args, {
    'container-inner': CARDS.map(card => ({
      type: 'card',
      parameters: createUniformParameter(card),
    })),
  });
  return (
    <UniformComposition data={fakeComposition}>
      <FlexContainer {...args} />
    </UniformComposition>
  );
};

export const Default: Story = {
  args: BASE_PROPS,
  argTypes,
  render: renderStory,
};
