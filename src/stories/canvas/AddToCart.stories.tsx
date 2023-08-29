import type { Meta, StoryObj } from '@storybook/react';
import { UniformComposition } from '@uniformdev/canvas-react';
import { AddToCart, AddToCartProps } from '@/canvas';
import { Container } from '@/components';
import { BackgroundTypes } from '@/utilities/styling';
import { createFakeCompositionData } from '../utils';
import { buttonStyleOptions } from '../constants';

const meta: Meta<typeof AddToCart> = {
  title: 'AddToCart',
  component: AddToCart,
};

export default meta;
type Story = StoryObj<typeof AddToCart>;

const BASE_PROPS: Omit<AddToCartProps, 'component'> = {
  buttonCopy: 'Add to Cart',
  buttonStyle: 'primary',
};

const argTypes = {
  buttonStyle: { control: 'select', options: buttonStyleOptions },
};

const renderStory = (args: AddToCartProps) => {
  const fakeComposition = createFakeCompositionData('price', args, {});
  return (
    <UniformComposition data={fakeComposition}>
      <Container backgroundType={BackgroundTypes.Light}>
        <AddToCart {...args} />
      </Container>
    </UniformComposition>
  );
};

export const Default: Story = {
  args: BASE_PROPS,
  argTypes,
  render: renderStory,
};
