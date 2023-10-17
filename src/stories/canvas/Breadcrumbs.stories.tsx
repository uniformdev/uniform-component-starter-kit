import type { Meta, StoryObj } from '@storybook/react';
import { UniformComposition } from '@uniformdev/canvas-react';
import { ComponentStarterKitContextProvider } from '@/context';
import { Breadcrumbs } from '@/canvas';
import { createFakeCompositionData } from '../utils';

const argTypes = {
  colorStyle: { control: 'select', options: ['primary', 'secondary', 'accent', 'base-200', 'base-300'] },
  separator: { control: 'select', options: ['chevron', 'slash', 'none'] },
};

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Breadcrumbs',
  component: Breadcrumbs,
};

const BREADCRUMBS = [
  {
    name: 'Home',
    path: '/',
    isRoot: true,
  },
  {
    name: 'Components',
    path: '/?path=/story/breadcrumbs--default',
  },
  {
    name: 'Placeholder',
    path: '/?path=/story/breadcrumbs--default',
    type: 'placeholder',
  },
  {
    name: 'Test',
    path: '/?path=/story/breadcrumbs--default',
  },
];

export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
  args: {
    colorStyle: 'primary',
    separator: 'chevron',
    displayRootNode: false,
    displayPlaceholderNodes: false,
  },
  argTypes,
  render: args => {
    const fakeComposition = createFakeCompositionData(
      'breadcrumbs',
      {
        colorStyle: args.colorStyle,
        separator: args.separator,
        displayRootNode: args.displayRootNode,
        displayPlaceholderNodes: args.displayPlaceholderNodes,
      },
      {}
    );
    return (
      <ComponentStarterKitContextProvider {...{ breadcrumbs: BREADCRUMBS }}>
        <UniformComposition data={fakeComposition}>
          <Breadcrumbs {...args} />
        </UniformComposition>
      </ComponentStarterKitContextProvider>
    );
  },
};
