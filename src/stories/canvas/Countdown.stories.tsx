import type { Meta, StoryObj } from '@storybook/react';
import { UniformComposition } from '@uniformdev/canvas-react';
import { Countdown, CountdownProps, CountdownVariant } from '@/canvas';
import { createFakeCompositionData } from '../utils';

const meta: Meta<typeof Countdown> = {
  title: 'Countdown',
  component: Countdown,
};

export default meta;
type Story = StoryObj<typeof Countdown>;

const BASE_PROPS: Omit<CountdownProps, 'component'> = {
  targetDate: '2024-07-04T00:00:00',
};

const renderStory = (args: CountdownProps) => {
  const fakeComposition = createFakeCompositionData('callToAction', args, {});
  return (
    <UniformComposition data={fakeComposition}>
      <Countdown {...args} />
    </UniformComposition>
  );
};

export const Default: Story = {
  args: BASE_PROPS,
  render: renderStory,
};

export const LabelsUnder: Story = {
  args: {
    ...BASE_PROPS,
    component: {
      type: 'countdown',
      variant: CountdownVariant.LabelsUnder,
    },
  },
  render: renderStory,
};

export const LabelsInBoxes: Story = {
  args: {
    ...BASE_PROPS,
    component: {
      type: 'countdown',
      variant: CountdownVariant.LabelsInBoxes,
    },
  },
  render: renderStory,
};
