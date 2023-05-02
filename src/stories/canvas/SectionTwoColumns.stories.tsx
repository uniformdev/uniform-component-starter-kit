import type { Meta, StoryObj } from '@storybook/react';
import { UniformComposition } from '@uniformdev/canvas-react';
import SectionTwoColumns, { Props as SectionTwoColumnsProps } from '@/canvas/containers/SectionTwoColumns';
import { createFakeCompositionData, createUniformParameter } from '../utils';

const verticalAlignmentOptions = ['top', 'center', 'bottom'];

const gridOrderOptions = ['order-first', 'order-last'];

const twoColumnWidthOptions = ['1/4 - 3/4', '1/3 - 2/3', '1/2 - 1/2', '2/3 - 1/3', '3/4 - 1/4'];

const meta: Meta<typeof SectionTwoColumns> = {
  title: 'SectionTwoColumns',
  component: SectionTwoColumns,
};

export default meta;
type Story = StoryObj<typeof SectionTwoColumns>;

const BASE_PROPS: Omit<SectionTwoColumnsProps, 'component'> = {
  columnWidths: '1/2 - 1/2',
  verticalAlignment: 'center',
  mobileItemsOrder: 'first',
  hasBottomBorder: true,
};

const argTypes = {
  columnWidths: { control: 'select', options: twoColumnWidthOptions },
  verticalAlignment: { control: 'select', options: verticalAlignmentOptions },
  mobileItemsOrder: { control: 'select', options: gridOrderOptions },
  hasBottomBorder: { control: 'boolean' },
};

const LeftContainer = {
  backgroundType: 'Dark',
};

const RightContainer = {
  backgroundType: 'Medium',
};

const renderStory = (args: SectionTwoColumnsProps) => {
  const fakeComposition = createFakeCompositionData('sectionTwoColumns', args, {
    leftContent: [
      {
        type: 'container',
        parameters: createUniformParameter(LeftContainer),
      },
    ],
    rightContent: [
      {
        type: 'container',
        parameters: createUniformParameter(RightContainer),
      },
    ],
  });
  return (
    <UniformComposition data={fakeComposition}>
      <SectionTwoColumns {...args} />
    </UniformComposition>
  );
};

export const Default: Story = {
  args: BASE_PROPS,
  argTypes,
  render: renderStory,
};
