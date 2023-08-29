import type { Meta, StoryObj } from '@storybook/react';
import { UniformComposition } from '@uniformdev/canvas-react';
import { Button, ButtonProps } from '@/canvas';
import { Container } from '@/components';
import { BackgroundTypes } from '@/utilities/styling';
import { createFakeCompositionData } from '../utils';
import { buttonStyleOptions } from '../constants';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

const BASE_PROPS: Omit<ButtonProps, 'component'> = {
  link: {
    path: '/',
  },
  copy: 'Click here',
  style: 'primary',
};

const argTypes = {
  style: { control: 'select', options: buttonStyleOptions },
};

const renderStory = (args: ButtonProps) => {
  const fakeComposition = createFakeCompositionData('button', args, {});
  return (
    <UniformComposition data={fakeComposition}>
      <Container backgroundType={BackgroundTypes.Light}>
        <Button {...args} />
      </Container>
    </UniformComposition>
  );
};

export const Default: Story = {
  args: BASE_PROPS,
  argTypes,
  render: renderStory,
};
