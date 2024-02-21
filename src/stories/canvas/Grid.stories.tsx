import type { Meta, StoryObj } from '@storybook/react';
import { UniformComposition } from '@uniformdev/canvas-react';
import { Grid, GridProps } from '@/canvas';
import { createFakeCompositionData, createUniformParameter } from '../utils';
import { BackgroundTypes, PaddingSize } from '@/utilities/styling';

const columnCountOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const gapXOptions = ['none', 'small', 'medium', 'large'];
const gapYOptions = ['none', 'small', 'medium', 'large'];

const meta: Meta<GridProps> = {
  title: 'Grid',
  component: Grid,
};

export default meta;
type Story = StoryObj<typeof Grid>;

const BASE_PROPS: Omit<GridProps, 'component' | 'children'> = {
  columnsCount: '3',
  gapX: 'small',
  gapY: 'small',
  marginTop: PaddingSize.Medium,
  marginBottom: PaddingSize.Medium,
  backgroundType: BackgroundTypes.Light,
  containerVariant: '',
  paddingTop: PaddingSize.Medium,
  paddingBottom: PaddingSize.Medium,
};

const argTypes = {
  columnsCount: { control: 'select', options: columnCountOptions },
  gapX: { control: 'select', options: gapXOptions },
  gapY: { control: 'select', options: gapYOptions },
};

const CARDS = [
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

const renderStory = (args: GridProps) => {
  const fakeComposition = createFakeCompositionData('grid', args, {
    'grid-inner': CARDS.map(card => ({
      type: 'card',
      parameters: createUniformParameter(card),
    })),
  });
  return (
    <UniformComposition data={fakeComposition}>
      <Grid {...args} />
    </UniformComposition>
  );
};

const indexToInsertSpan = 3;

const renderStoryWithColumnSpan = (args: GridProps) => {
  const fakeComposition = createFakeCompositionData('grid', args, {
    'grid-inner': CARDS.slice(0, -1).map((card, index) => ({
      type: 'gridItem',
      parameters: createUniformParameter(
        index === indexToInsertSpan
          ? {
              columnSpan: '2',
            }
          : {}
      ),
      slots: {
        inner: [
          index === indexToInsertSpan
            ? {
                type: 'content',
                parameters: createUniformParameter({
                  title: 'Example of a grid item that span 2 columns',
                  text: 'Use this paragraph to share information about your company or brand. Make it as engaging as possible.',
                }),
              }
            : {
                type: 'card',
                parameters: createUniformParameter(card),
              },
        ],
      },
    })),
  });
  return (
    <UniformComposition data={fakeComposition}>
      <Grid {...args} />
    </UniformComposition>
  );
};

const renderStoryWithRowSpan = (args: GridProps) => {
  const fakeComposition = createFakeCompositionData('grid', args, {
    'grid-inner': [...CARDS, ...CARDS].slice(0, -1).map((card, index) => ({
      type: 'gridItem',
      parameters: createUniformParameter(
        index === indexToInsertSpan
          ? {
              rowSpan: '2',
            }
          : {}
      ),
      slots: {
        inner: [
          index === indexToInsertSpan
            ? {
                type: 'content',
                parameters: createUniformParameter({
                  title: 'Example of a grid item that span 2 rows',
                  text: 'Use this paragraph to share information about your company or brand. Make it as engaging as possible.',
                }),
              }
            : {
                type: 'card',
                parameters: createUniformParameter(card),
              },
        ],
      },
    })),
  });
  return (
    <UniformComposition data={fakeComposition}>
      <Grid {...args} />
    </UniformComposition>
  );
};

export const Default: Story = {
  args: BASE_PROPS,
  argTypes,
  render: renderStory,
};

export const GridWithColumnSpan: Story = {
  args: BASE_PROPS,
  argTypes,
  render: renderStoryWithColumnSpan,
};

export const GridWithRowSpan: Story = {
  args: BASE_PROPS,
  argTypes,
  render: renderStoryWithRowSpan,
};
