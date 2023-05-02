import type { Meta, StoryObj } from '@storybook/react';
import { UniformComposition } from '@uniformdev/canvas-react';
import GridContainer, { Props as GridContainerProps } from '@/canvas/containers/GridContainer';
import { createFakeCompositionData, createUniformParameter } from '../utils';

const columnCountOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

const meta: Meta<typeof GridContainer> = {
  title: 'GridContainer',
  component: GridContainer,
};

export default meta;
type Story = StoryObj<typeof GridContainer>;

const BASE_PROPS: Omit<GridContainerProps, 'component'> = {
  columnsCount: '1',
};

const argTypes = {
  columnsCount: { control: 'select', options: columnCountOptions },
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

const renderStory = (args: GridContainerProps) => {
  const fakeComposition = createFakeCompositionData('gridContainer', args, {
    'container-inner': CARDS.map(card => ({
      type: 'card',
      parameters: createUniformParameter(card),
    })),
  });
  return (
    <UniformComposition data={fakeComposition}>
      <GridContainer {...args} />
    </UniformComposition>
  );
};

export const Default: Story = {
  args: BASE_PROPS,
  argTypes,
  render: renderStory,
};
