import type { Meta, StoryObj } from '@storybook/react';
import { UniformComposition } from '@uniformdev/canvas-react';
import { Price, PriceProps } from '@/canvas';
import { Container } from '@/components';
import { BackgroundTypes } from '@/utilities/styling';
import { createFakeCompositionData } from '../utils';
import { currencyOptions, titleStyleOptions } from '../constants';

const meta: Meta<typeof Price> = {
  title: 'Price',
  component: Price,
};

export default meta;
type Story = StoryObj<typeof Price>;

const BASE_PROPS: Omit<PriceProps, 'component'> = {
  label: 'Price:',
  labelStyle: 'h1',
  price: 100,
  currency: 'USD',
};

const argTypes = {
  labelStyle: { control: 'select', options: titleStyleOptions },
  currency: { control: 'select', options: currencyOptions },
};

const renderStory = (args: PriceProps) => {
  const fakeComposition = createFakeCompositionData('price', args, {});
  return (
    <UniformComposition data={fakeComposition}>
      <Container backgroundType={BackgroundTypes.Light}>
        <Price {...args} />
      </Container>
    </UniformComposition>
  );
};

export const Default: Story = {
  args: BASE_PROPS,
  argTypes,
  render: renderStory,
};
