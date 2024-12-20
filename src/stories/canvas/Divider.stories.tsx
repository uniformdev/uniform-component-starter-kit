import type { Meta, StoryObj, ArgTypes } from '@storybook/react';
import { UniformComposition } from '@uniformdev/canvas-react';
import { Divider, DividerProps } from '@/canvas';
import { createFakeCompositionData } from '../utils';

const meta: Meta<typeof Divider> = {
  title: 'Divider',
  component: Divider,
};

export default meta;

type Story = StoryObj<typeof Divider>;

const argTypes: Partial<ArgTypes<DividerProps>> = {
  colorStyle: { control: 'select', options: ['primary', 'secondary', 'accent', 'base-200', 'base-300'] },
};

export const Default: Story = {
  args: {
    colorStyle: 'primary',
    thickness: 1,
  },
  argTypes,
  render: args => {
    const fakeComposition = createFakeCompositionData(
      'divider',
      {
        colorStyle: args.colorStyle,
        thickness: args.thickness,
      },
      {}
    );
    return (
      <UniformComposition data={fakeComposition}>
        <Divider {...args} />
      </UniformComposition>
    );
  },
};
