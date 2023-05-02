import type { Meta, StoryObj } from '@storybook/react';
import { UniformComposition } from '@uniformdev/canvas-react';
import CallToAction, { CallToActionVariant, Props as CallToActionProps } from '@/canvas/CallToAction';
import { createFakeCompositionData } from '../utils';
import { buttonStyleOptions, titleStyleOptions } from '../constants';

const meta: Meta<typeof CallToAction> = {
  title: 'CallToAction',
  component: CallToAction,
};

export default meta;
type Story = StoryObj<typeof CallToAction>;

const BASE_PROPS: Omit<CallToActionProps, 'component'> = {
  eyebrowText: 'CALL TO ACTION',
  title: 'Are developers stuck with outdated tech and custom code to maintain?',
  titleStyle: 'h2',
  description:
    'Use this paragraph to share information about your company or brand. Make it as engaging as possible, and showcase your brand`s unique personality.',
  primaryButtonCopy: 'Home',
  primaryButtonLink: {
    path: '/',
  },
  primaryButtonStyle: 'primary',
  secondaryButtonCopy: 'Components',
  secondaryButtonLink: {
    path: '/',
  },
  secondaryButtonStyle: 'link',
};

const argTypes = {
  titleStyle: { control: 'select', options: titleStyleOptions },
  primaryButtonStyle: { control: 'select', options: buttonStyleOptions },
  secondaryButtonStyle: { control: 'select', options: buttonStyleOptions },
};

const renderStory = (args: CallToActionProps) => {
  const fakeComposition = createFakeCompositionData('callToAction', args, {});
  return (
    <UniformComposition data={fakeComposition}>
      <CallToAction {...args} />
    </UniformComposition>
  );
};

export const Default: Story = {
  args: BASE_PROPS,
  argTypes,
  render: renderStory,
};

export const LeftAligned: Story = {
  args: {
    ...BASE_PROPS,
    component: {
      type: 'callToAction',
      variant: CallToActionVariant.AlignLeft,
    },
  },
  argTypes,
  render: renderStory,
};

export const RightAligned: Story = {
  args: {
    ...BASE_PROPS,
    component: {
      type: 'callToAction',
      variant: CallToActionVariant.AlignRight,
    },
  },
  argTypes,
  render: renderStory,
};

export const Featured: Story = {
  args: {
    ...BASE_PROPS,
    component: {
      type: 'callToAction',
      variant: CallToActionVariant.Featured,
    },
  },
  argTypes,
  render: renderStory,
};
