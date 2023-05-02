import type { Meta, StoryObj } from '@storybook/react';
import { UniformComposition } from '@uniformdev/canvas-react';
import SectionOneColumn, { Props as SectionOneColumnProps } from '@/canvas/containers/SectionOneColumn';
import { createFakeCompositionData, createUniformParameter } from '../utils';
import { horizontalAlignmentOptions } from '../constants';

const oneColumnWidthOptions = ['1', '1/2', '1/3', '2/3', '1/4', '3/4'];

const meta: Meta<typeof SectionOneColumn> = {
  title: 'SectionOneColumn',
  component: SectionOneColumn,
};

export default meta;
type Story = StoryObj<typeof SectionOneColumn>;

const BASE_PROPS: Omit<SectionOneColumnProps, 'component'> = {
  width: '1',
  alignment: 'center',
  textAlignment: 'center',
};

const argTypes = {
  width: { control: 'select', options: oneColumnWidthOptions },
  alignment: { control: 'select', options: horizontalAlignmentOptions },
  textAlignment: { control: 'select', options: horizontalAlignmentOptions },
};

const Container = {
  backgroundType: 'Dark',
};

const renderStory = (args: SectionOneColumnProps) => {
  const fakeComposition = createFakeCompositionData('sectionOneColumn', args, {
    'section-content': [
      {
        type: 'container',
        parameters: createUniformParameter(Container),
      },
    ],
  });
  return (
    <UniformComposition data={fakeComposition}>
      <SectionOneColumn {...args} />
    </UniformComposition>
  );
};

export const Default: Story = {
  args: BASE_PROPS,
  argTypes,
  render: renderStory,
};
